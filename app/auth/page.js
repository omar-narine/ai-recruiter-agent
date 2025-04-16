"use client";
import React from "react";
import Image from "next/image";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";

function Login() {
  // Used to sign in with Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-column items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        />
        <div className="flex flex-col items-center">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={300}
            height={100}
            className="w-[400px h-[250px]] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to Underdog Recruiting!
          </h2>
          <p className="text-gray-500 text-center">Sign In With Google!</p>
          <Button className="mt-7 w-50" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
