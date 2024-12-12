"use client";

import React, { useState } from "react";
import VerificationCodeRegister from "./VerificationCodeRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert(
        "Validation Error. Please accept the terms and conditions to proceed."
      );
      return;
    }

    if (formData.password.length <= 7) {
      alert("Validation Error. Password must be more than 7 characters long.");
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const contentType = response.headers.get("Content-Type");

      let responseData;
      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.ok) {
        if (typeof responseData === "string") {
          console.log("Server response:", responseData);
        } else {
          console.log("User registered successfully:", responseData.user);
          localStorage.setItem("jwt", responseData.token);
        }
        alert("Registration successful. Token saved to localStorage.");
        setRegistrationSuccess(true);
      } else {
        if (responseData === "USER_EXISTS") {
          alert("Validation error. User already exists.");
        } else if (response.status === 422) {
          alert("Validation error. Please check your input.");
        } else {
          alert(
            `An error occurred during registration: ${
              responseData || "Unknown"
            }`
          );
        }
        console.log("Error response:", responseData);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleCloseVerification = () => {
    setRegistrationSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      termsAccepted: false,
    });
  };

  return (
    <div className="relative">
      {registrationSuccess && (
        <VerificationCodeRegister
          email={formData.email}
          onClose={handleCloseVerification}
        />
      )}

      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/NoteStream.png"
            alt="NoteStream Logo"
            className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-lg"
          ></img>
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold mb-6">
              Create your NoteStream ID
            </h1>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-1/2 p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-50 transition-all"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-1/2 p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-50 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-50 transition-all"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 pr-10 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-50 transition-all"
                autoComplete="on"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-all"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                id="terms"
                className="appearance-none w-4 h-4 bg-white border border-gray-300 rounded-full checked:bg-teal-500 cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                By proceeding, you agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={!formData.termsAccepted}
              className={`w-full p-3 rounded-lg focus:outline-none font-bold text-white bg-teal-500 ${
                formData.termsAccepted
                  ? "hover:bg-teal-600"
                  : " opacity-50 cursor-not-allowed"
              }`}
            >
              Sign up with email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
