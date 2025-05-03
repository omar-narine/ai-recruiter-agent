import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback;
  console.log("Candidate:", candidate);
  console.log("Feedback:", feedback);
  console.log("Feedback summary:", feedback?.feedback?.summary);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <h2 className="bg-gray-600 font-bold text-white p-3 px-4.5 rounded-full">
                    {candidate?.userName[0]}
                  </h2>
                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-gray-500 text-sm">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {candidate?.feedback?.feedback?.rating?.experience ? (
                    <h2 className="text-primary font-bold text-2xl">
                      {candidate?.feedback?.feedback?.rating?.experience}/10
                    </h2>
                  ) : (
                    <h2 className="text-orange-400">Pending</h2>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Skills Assessment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical
                      <span>
                        {feedback?.feedback?.rating?.technicalSkills}/10
                      </span>
                    </h2>
                    <Progress
                      value={feedback?.feedback?.rating?.technicalSkills * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication
                      <span>
                        {feedback?.feedback?.rating?.communication}/10
                      </span>
                    </h2>
                    <Progress
                      value={feedback?.feedback?.rating?.communication * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving
                      <span>
                        {feedback?.feedback?.rating?.problemSolving}/10
                      </span>
                    </h2>
                    <Progress
                      value={feedback?.feedback?.rating?.problemSolving * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience
                      <span>{feedback?.feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.feedback?.rating?.experience * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-secondary my-3 rounded-md">
                  <p>{feedback?.feedback?.summary}</p>
                </div>
              </div>
              <div className={`p-5` $}>

              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
