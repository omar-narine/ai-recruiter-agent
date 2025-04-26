import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListConainter";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();
  const { user } = useUser();

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

  const onFinish = async () => {
    const interview_id = uuidv4();

    try {
      const { data, error } = await supabase
        .from("Interview")
        .insert([
          {
            ...formData,
            questionList: questionList,
            userEmail: user?.email,
            interview_id: interview_id,
          },
        ])
        .select();

      console.log(data);
    } catch (e) {
      console.log(e);
      toast("There was an error saving your questions!");
    }
  };

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
        <QuestionListContainer
          questionList={questionList}
          onFinish={onFinish}
        ></QuestionListContainer>
      )}
    </div>
  );
}

export default QuestionList;
