"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDatatContext";

function Interview() {
  const { interview_id } = useParams();
  console.log(interview_id);
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);

    try {
      let { data: Interview, error } = await supabase
        .from("Interview")
        .select("jobPosition, jobDescription, duration, type")
        .eq("interview_id", interview_id);

      setInterviewData(Interview[0]);
      console.log(Interview[0]);

      if (Interview?.length == 0) {
        toast("Incorrect Interview Link");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast("Incorrect Interview Links");
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interview, error } = await supabase
      .from("Interview")
      .select("*")
      .eq("interview_id", interview_id);

    console.log(Interview[0]);
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interview[0],
    });
    router.push("/interview/" + interview_id + "/start");
    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 sm:px-24 lg:px-32 xl:px-52 mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-30 h-20"
        />
        <h2 className="mt-3">AI Powered Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt="interview"
          width={500}
          height={500}
          className="w-2xs my-6"
        />
        <h2 className="font-bold text-xl">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4 " />
          {interviewData?.duration}
        </h2>
        <div className="w-full">
          <h2>Enter your full name</h2>
          <Input
            placeholder="e.g. John Doe"
            onChange={(event) => setUserName(event.target.value)}
          ></Input>
        </div>
        <div className="w-full mt-3">
          <h2>Enter your email</h2>
          <Input
            placeholder="e.g. jdoe@gmail.com"
            onChange={(event) => setUserEmail(event.target.value)}
          ></Input>
        </div>
        <div className="p-3 bg-blue-50 flex gap-4 rounded-lg mt-5">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold">Before your begin:</h2>
            <ul>
              <li className="tex-sm text-primary">
                -Find a quiet and well lit space
              </li>
              <li className="tex-sm text-primary">
                - Ensure you have a stable internet connection
              </li>
              <li className="tex-sm text-primary">
                - Test your camera and microphone
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-5 w-full font-bold"
          disabled={loading || !userName || !userEmail}
          onClick={() => onJoinInterview()}
        >
          <Video />
          {loading && <Loader2 />}
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
