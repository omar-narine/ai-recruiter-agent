"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from("Interview")
      .select(
        "jobPosition, jobDescription, type,  duration, questionList, interview_id, created_at, Interview-Feedback(interview_id, userEmail, userName, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id)
      .order("id", { ascending: false });

    setInterviewDetail(result?.data[0]);
    console.log(result);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
    </div>
  );
}

export default InterviewDetail;
