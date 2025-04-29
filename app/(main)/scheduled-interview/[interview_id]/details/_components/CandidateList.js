import moment from "moment";
import React from "react";
import { Button } from "@/components/ui/button";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  console.log("Candidate", candidateList);
  return (
    <div>
      <h2 className="font-bold my-5">Candidates: {candidateList?.length}</h2>
      {candidateList.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex gap-3 items-center bg-white rounded-lg my-3 justify-between"
        >
          <div className="flex items-center gap-5">
            <h2 className="bg-gray-600 font-bold text-white p-3 px-4.5 rounded-full">
              {candidate?.userName[0]}
            </h2>
            <div>
              <h2 className="font-bold">{candidate?.userName}</h2>
              <h2 className="text-gray-500 text-sm">
                Completed On:{" "}
                {moment(candidate.created_at).format("MMM DD yyyy")}
              </h2>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {candidate?.feedback?.feedback?.rating?.experience ? (
              <h2 className="text-green-800">
                {candidate?.feedback?.feedback?.rating?.experience}/10
              </h2>
            ) : (
              <h2 className="text-orange-400">Pending</h2>
            )}
          </div>
          <CandidateFeedbackDialog candidate={candidate} />
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
