"use client";
import { InterviewDataContext } from "@/context/InterviewDatatContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import Vapi from "@vapi-ai/web";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  const startCall = () => {
    if (interviewInfo) {
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="flex flex-col bg-white h-96 rounded-lg border items-center justify-center">
          <Image
            src={"/ai_interview.png"}
            alt="ai_interview"
            width={100}
            height={100}
            className="w-20 h-20 rounded-full object-cover"
          />
          <h2 className="mt-3 text-2xl text-gray-500">AI Interviewer</h2>
        </div>
        <div className="flex flex-col bg-white h-96 rounded-lg border items-center justify-center">
          <h2 className="w-20 h-20 rounded-full object-cover border flex items-center justify-center bg-gray-200 text-2xl">
            {interviewInfo?.userName[0]}
          </h2>
          <h2 className="mt-3 text-2xl text-gray-500">
            {interviewInfo?.userName}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white cursor-pointer" />
        <Phone className="h-12 w-12 p-3 bg-red-500 rounded-full text-white cursor-pointer" />
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
