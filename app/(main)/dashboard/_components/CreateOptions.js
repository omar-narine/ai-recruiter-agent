import { Video } from "lucide-react";
import React from "react";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <Video className="text-primary bg-blue-50 rounded-lg h-3 w-3 p-3" />
      </div>
      <div>Phone Screening</div>
    </div>
  );
}

export default CreateOptions;
