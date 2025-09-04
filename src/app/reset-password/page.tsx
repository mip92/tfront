import React from "react";
import { ResetPasswordClient } from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex justify-center pt-[100px] pb-8 px-4">
        <div className="w-[300px]">
          <ResetPasswordClient />
        </div>
      </div>
    </div>
  );
}
