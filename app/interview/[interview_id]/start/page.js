"use client";
import { InterviewDataContext } from "@/context/InterviewDatatContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";

function StartInterview() {
  const { interview_id } = useParams();
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUSer] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);
  const [callEnd, setCallEnd] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //     if (interviewInfo) {
  //       startCall();
  //     }
  //   }, [interviewInfo]);

  const startCall = () => {
    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = questionList + ", " + item.question)
    );

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on" +
        interviewInfo?.interviewData?.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your` +
              interviewInfo?.interviewData?.jobPosition +
              `interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions:` +
              questionList +
              `If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
    setCallEnd(true);
    toast("Call Disconnected");
    GeneratedFeedback();
  };

  //   vapi.on("message", (message) => {
  //     console.log(message?.conversation);
  //     setConversation(message?.conversation);
  //   });

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }

    const handleMessage = (message) => {
      console.log("Message: ", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation String: ", convoString);
        setConversation(convoString);
      }
    };

    vapi.on("message", handleMessage);

    vapi.on("call-start", () => {
      console.log("Call has started.");
      toast("Call Connected!");
    });
    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUSer(false);
    });
    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUSer(true);
    });
    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast("Your interview has ended!");
    });

    // Clean up the VAPI Listener
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("ENDING VAPI SERVICE"));
      vapi.off("speech-start", () => console.log("ENDING VAPI SERVICE"));
      vapi.off("speech-end", () => console.log("ENDING VAPI SERVICE"));
      vapi.off("call-end", () => console.log("ENDING VAPI SERVICE"));
    };
  }),
    [interviewInfo];

  const GeneratedFeedback = async () => {
    setLoading(true);
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
    console.log(FINAL_CONTENT);

    // Save to DB

    const { data, error } = await supabase
      .from("Interview-Feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false, // TO BE UPDATED
        },
      ])
      .select();

    console.log(data);
    router.replace("/interview/" + interview_id + "/completed");
    setLoading(false);
  };

  return (
    <div className="p-20 lg:px-48 xl:56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="flex flex-col items-center justify-center bg-white h-96 rounded-lg border ">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {!activeUser && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
              )}
              <Image
                src={"/ai_interview.png"}
                alt="ai_interview"
                width={100}
                height={100}
                className="w-20 h-20 rounded-full object-cover relative z-10"
              />
            </div>
            <h2 className="mt-3 text-2xl text-gray-500">AI Interviewer</h2>
          </div>
        </div>
        <div className="flex flex-col bg-white h-96 rounded-lg border items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {activeUser && (
                <span className="absolute inset-0 rounded-full bg-gray-500 opacity-75 animate-ping" />
              )}
              <h2 className="w-20 h-20 rounded-full object-cover border flex items-center justify-center bg-gray-200 text-2xl">
                {interviewInfo?.userName[0]}
              </h2>
            </div>
          </div>
          <h2 className="mt-3 text-2xl text-gray-500">
            {interviewInfo?.userName}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white cursor-pointer" />
        <AlertConfirmation stopInterview={stopInterview}>
          {!loading ? (
            <Phone className="h-12 w-12 p-3 bg-red-500 rounded-full text-white cursor-pointer" />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
