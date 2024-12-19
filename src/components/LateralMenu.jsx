"use client";

import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaFileSignature,
  FaGithub,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const LateralMenu = ({ isOpen, onToggle }) => {
  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64 flex flex-col`}
      >
        <div className="flex p-6 border-b border-gray-700 items-center justify-between">
          <div className="block">
            <Link href="/">
              <img
                src="/NoteStream.png"
                alt="NoteStream Logo"
                className="w-16 h-16 object-contain rounded-full border-2 border-white shadow-lg"
              />
            </Link>
          </div>
          <h1 className="text-xl font-bold px-3">NoteStream</h1>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <nav className="mt-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center justify-start px-6 py-3 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <FaPerson />
                  <p className="px-2">Clients</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="flex items-center justify-start px-6 py-3 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <FaBriefcase />
                  <p className="px-2">Projects</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-notes"
                  className="flex items-center justify-start px-6 py-3 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <FaFileSignature />
                  <p className="px-2">Delivery Notes</p>
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Link
              href="https://github.com/Jmef19"
              className="flex items-center justify-start px-6 py-3 hover:bg-gray-700 rounded-lg transition duration-200 mt-auto"
            >
              <FaGithub />
              <p className="px-2">GitHub</p>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`
          fixed top-8 z-50
          p-2 sm:p-3 
          bg-teal-500 text-white 
          rounded-full 
          shadow-md 
          hover:bg-teal-600 
          transition-all 
          duration-300 
          ${isOpen ? "sm:left-32 lg:left-72" : "sm:left-4 lg:left-8"} 
          w-12 h-12 sm:w-16 sm:h-16 lg:w-auto lg:h-auto
          `}
      >
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
    </div>
  );
};

export default LateralMenu;

LateralMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
