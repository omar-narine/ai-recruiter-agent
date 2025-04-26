import React from "react";
import { Button } from "@/components/ui/button";

function QuestionListContainer({ questionList }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Generated Interview Questions:</h2>
      <div className="p-5 border border-gray-300 rounded-xl mt-5">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="p-3 border flex flex-col gap-3 border-gray-200 rounded-xl mb-3"
          >
            <h2 className="font-bold">{item.question}</h2>
            <h2 className="text-sm text-gray-600">Type: {item?.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
