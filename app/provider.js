"use client";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect } from "react";

function Provider({ children }) {
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      // Check if user already exists
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      console.log("Existing User in DB: ", Users);

      // If not, then create new user
      if (Users?.length == 0) {
        const { data, error } = await supabase
          .from("Users")
          .insert([
            {
              name: user?.user_metadata?.name,
              email: user?.email,
              picture: user?.user_metadata.picture,
            },
          ])
          .select();

        console.log("New User Added to DB: ", data);
      }
    });
  };

  return <div>{children}</div>;
}

export default Provider;
