"use client";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const VerificationCodeRegister = ({ email, onClose }) => {
  const maskedEmail = email.replace(
    /([\w+.-]{3})[\w+.-]+@/,
    (match, firstPart) => {
      const localPart = match.split("@")[0];
      const numStars = localPart.length - 3;
      return `${firstPart}${"*".repeat(numStars)}@`;
    }
  );

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleInputChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const router = useRouter();

  const handleVerify = async () => {
    const verificationCode = code.join("");
    let token = localStorage.getItem("rtoken");

    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }

    if (verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/user/validation",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code: verificationCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        if (response.status === 401) {
          setError(
            "Unauthorized. Your session may have expired. Please log in again."
          );
        } else if (response.status === 422) {
          setError("Invalid code. Please try again.");
        } else {
          setError(errorData.message || "An unexpected error occurred.");
        }
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Network or server error:", error);
      setError("A network error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const isButtonDisabled = code.some((digit) => digit === "");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6 bg-black/40">
      <div className="bg-white p-8 rounded-xl shadow-2xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-700 mb-6">
          A verification code has been sent to <strong>{maskedEmail}</strong>.
          Please check your inbox and enter the code below.
        </p>
        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className="w-12 h-16 text-center text-3xl font-bold 
                  border-2 border-gray-300 rounded-lg 
                  focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50
                  transition-all duration-200 
                  text-gray-800 
                  hover:border-teal-400"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          disabled={isButtonDisabled}
          className={`w-full p-3 rounded-lg focus:outline-none font-bold text-white bg-teal-500 ${
            isButtonDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-teal-600"
          }`}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerificationCodeRegister;

VerificationCodeRegister.propTypes = {
  email: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
