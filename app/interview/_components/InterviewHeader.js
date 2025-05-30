import Image from "next/image";
import React from "react";

function InterviewHeader() {
  return (
    <div className="flex p-4 shadow-sm justify-center">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={100}
        className="w-35 h-25"
      />
    </div>
  );
}

export default InterviewHeader;
