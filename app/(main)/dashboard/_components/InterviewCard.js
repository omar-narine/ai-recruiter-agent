import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  const onSend = () => {
    window.location.href =
      "mailto:?subject=AI Interview Recruiter Link&body=Interview Link: " + url;
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 bg-primary rounded-full"></div>
        <h2>{moment(interview?.created_at).format("DD MMM yyy")}</h2>
      </div>
      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration}
        <span className="text-green-800">
          {interview["Interview-Feedback"] &&
            interview["Interview-Feedback"].length}{" "}
          Candidates
        </span>
      </h2>
      {!viewDetail ? (
        <div className="grid grid-cols-2 gap-3 w-full mt-5">
          <Button variant={"outline"} onClick={copyLink}>
            <Copy />
            Copy Link
          </Button>
          <Button onClick={onSend}>
            <Send />
            Send
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button variant={"outline"} className="mt-5 w-full">
            View Details
            <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
