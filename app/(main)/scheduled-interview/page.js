"use client";
import { useUser } from "@/app/provider";
import React, { useEffect } from "react";
import { supabase } from "@/services/supabaseClient";

function ScheduledInterview() {
  const user = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interview-Feedback")
      .select(
        "jobPosition, duration, interview_id, Interview-Feedback(interview_id)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result);
  };
  return <div>ScheduledInterview</div>;
}

export default ScheduledInterview;
