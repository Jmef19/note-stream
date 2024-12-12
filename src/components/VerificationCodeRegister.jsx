import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const VerificationCodeRegister = ({ email, onClose }) => {
  const maskedEmail = email.replace(/(\w{3})[\w.-]+@/, (match, firstPart) => {
    const localPart = match.split("@")[0];
    const numStars = localPart.length - 3;
    return `${firstPart}${"*".repeat(numStars)}@`;
  });

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

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code entered:", verificationCode);
      // Call your verification logic here
    } else {
      alert("Verification Error. Please enter a complete 6-digit code.");
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
