"use client";
import { useUser } from "@/app/provider";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interview")
      .select(
        "jobPosition, duration, interview_id, Interview-Feedback(interview_id)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result);
    setInterviewList(result.data);
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">
        Interview List with Candidate Feedback
      </h2>

      {/* No Scheduled Interviews Message */}
      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2 className="text-center">
            You don't have any interviews created!
          </h2>
          <Button>Create New Interview</Button>
        </div>
      )}

      {/* Interview List Grid with existing Scheduled Interviews */}

      {interviewList && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
