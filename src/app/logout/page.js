"use client";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <div className="relative">
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/NoteStream.png"
            alt="NoteStream Logo"
            className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-lg"
          ></img>
          <h1 className="text-3xl font-bold mb-6">Logged out succesfully</h1>

          <button
            type="submit"
            className="w-full p-3 rounded-lg focus:outline-none font-bold text-white bg-teal-500 hover:bg-teal-600"
            onClick={handleClick}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
