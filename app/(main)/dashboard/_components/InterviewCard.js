import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import moment from "moment";
import React from "react";

function InterviewCard({ interview }) {
  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 bg-primary rounded-full"></div>
        <h2>{moment(interview?.created_at).format("DD MMM yyy")}</h2>
      </div>
      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2">{interview?.duration}</h2>
      <div className="grid grid-cols-2 gap-3 w-full mt-5">
        <Button variant={"outline"}>
          <Copy />
          Copy Link
        </Button>
        <Button>
          <Send />
          Send
        </Button>
      </div>
    </div>
  );
}

export default InterviewCard;
