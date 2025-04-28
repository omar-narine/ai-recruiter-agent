import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview }) {
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
      <h2 className="mt-2">{interview?.duration}</h2>
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
    </div>
  );
}

export default InterviewCard;
