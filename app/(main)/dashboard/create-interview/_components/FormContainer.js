import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { InterviewType } from "@/services/Constants";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function FormContainer({ onHandleInputChange }) {
  // Ensure proper handling of event type being clicked
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    if (!interviewType.includes(type)) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item != type);
      setInterviewType(result);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full-Stack Software Engineer"
          className="mt-2"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>
      <div>
        <h2 className="text-sm mt-5 font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter Job Description"
          className="mt-2 h-48"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>
      <div>
        <h2 className="text-sm mt-5 font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h2 className="text-sm mt-5 font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 border border-gray-300 rounded-2xl items-center cursor-pointer hover:bg-secondary ${
                interviewType.includes(type.title)
                  ? "bg-blue-50 text-primary"
                  : "bg-white"
              }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="h-4 w-4" />
              <h2>{type.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        <Button>
          Generate Question
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
