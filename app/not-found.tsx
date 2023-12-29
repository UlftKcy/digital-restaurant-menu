'use client'
import { BadgeInfo } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col place-items-center space-y-5 ring-1 ring-slate-400 p-5 w-1/2 m-auto">
     <BadgeInfo size={32}/>
      <span className="text-lg">Not Found Page</span>
      <div className="mt-3">
        <button
          onClick={()=>router.back()}
          className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 font-semibold rounded-lg"
        >
          Return To Back
        </button>
      </div>
    </div>
  );
}