"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/user/login",
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
          console.log("User logged in successfully:", responseData.user);
          localStorage.setItem("jwt", responseData.token);
        }
        router.push("/");
      } else {
        if (response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else {
          alert(`An error occurred during login: ${responseData || "Unknown"}`);
        }
        console.log("Error response:", responseData);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
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
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
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
            <button
              type="submit"
              className="w-full p-3 rounded-lg focus:outline-none font-bold text-white bg-teal-500 hover:bg-teal-600"
            >
              Log in
            </button>
            <Link href="/register">
              <p className="text-teal-500 hover:underline text-center pt-2">
                Register now
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
