import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/lost.png"
            alt="404 Error"
            width={400}
            height={300}
            className="opacity-80"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>

        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            Return to Home Page
          </Link>

          <Link
            href="/login"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            Go to Login
          </Link>
        </div>

        <div className="pt-8 text-sm text-gray-500">
          If the problem persists, please contact support at{" "}
          <a
            href="https://github.com/Jmef19/note-stream"
            className="text-blue-500 hover:underline"
          >
            https://github.com/Jmef19/note-stream
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
