import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log(result.data.content);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
      setLoading(false);
    } catch (e) {
      toast("Server Error, try again!");
      console.log(e);
      setLoading(false);
    }
  };

  const onFinish = () => {};

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="mt-2 text-primary">
              Our AI is crafting personalized questions based on your job
              position!
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
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
          <div className="flex justify-end mt-5">
            <Button onClick={() => onFinish()}>Finish</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
