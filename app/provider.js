"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState, useContext } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();

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
        setUser(data[0]);

        console.log("New User Added to DB: ", data);
      }

      setUser(Users[0]);
    });
  };

  return (
    <div className="bg-gray-100">
      <UserDetailContext.Provider value={{ user, setUser }}>
        <div>{children}</div>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
