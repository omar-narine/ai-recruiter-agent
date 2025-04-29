"use client";
import { useParams } from "next/navigation";
import React from "react";

function InterviewDetail() {
  const { interview_id } = useParams();

  return <div>InterviewDetail</div>;
}

export default InterviewDetail;
