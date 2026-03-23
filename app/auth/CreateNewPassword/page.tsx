import CreateNewPassword from "@/components/auth/CreateNewPassword";
import Image from "next/image";
import LogoDac from "../../../Asset/images/favicon.svg";
import { GraduationCap } from "lucide-react";

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex items-center justify-center gap-8 mb-8 p-4 rounded-lg">
        <Image 
          src={LogoDac} 
          alt="DAC" 
          width={60} 
          height={60}
          className="drop-shadow-md"
        />
        <div className="w-px h-16 bg-gray-200"></div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-200 p-3 rounded-xl shadow-sm">
        <GraduationCap size={24} className="text-indigo-600" />
          </div>
          <p className="uppercase text-xs text-gray-600 font-semibold tracking-wide">
        Partner University
          </p>
        </div>
      </div>
            <CreateNewPassword />
        </div>
    );
}
