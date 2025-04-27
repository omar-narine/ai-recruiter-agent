import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  List,
  Mail,
  Plus,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";

function InterviewLink({ formData, interview_id }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied to Clipboard!");
  };

  const GetInterviewUrl = () => {
    return url;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/check.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[80px] h-[80px]"
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mt-3 text-center">
        Share this link with your candidates to start the interview process
      </p>

      {/* Interview Link Box */}
      <div className="w-full p-7 mt-6 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-4xl">
            Valid for 30 days
          </h2>
        </div>
        <div className="mt-3 flex justify-between gap-2 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled={true}></Input>
          <Button onClick={() => onCopyLink()}>
            <Copy />
            Copy Link
          </Button>
        </div>
        <hr className="my-5"></hr>
        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" />
            10 Questions TEMP
          </h2>
          {/* <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Calendar className="h-4 w-4" />
            30 T Mins
            {formData.duration}
          </h2> */}
        </div>
      </div>

      {/* Share Via Box*/}
      <div className="mt-7 bg-white p-5 rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button variant={"outline"} className="w-full">
            <Mail />
            Email
          </Button>
          <Button variant={"outline"} className="w-full">
            <Mail />
            Slack
          </Button>
          <Button variant={"outline"} className="w-full">
            <Mail />
            Message
          </Button>
        </div>
      </div>

      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href={"/dashboard"}>
          <Button variant={"outline"}>
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Link href={"/create-interview"}>
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
