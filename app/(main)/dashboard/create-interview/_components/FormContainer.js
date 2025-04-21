import { Input } from "@/components/ui/input";
import React from "react";

function FormContainer() {
  return (
    <div className="bg-white p-5">
      <div>
        <h2 className="text-sm">Job Position</h2>
        <Input
          placeholder="e.g. Full-Stack Software Engineer"
          className="mt-2"
        />
      </div>
      <div>
        <h2 className="text-sm mt-5">Job Description</h2>
        <Input
          placeholder="e.g. Full-Stack Software Engineer"
          className="mt-2"
        />
      </div>
    </div>
  );
}

export default FormContainer;
