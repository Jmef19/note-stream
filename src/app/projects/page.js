'use client'

import { useState } from "react";

import Header from "@/components/Header";
import LateralMenu from "@/components/LateralMenu";
import Projects from "@/components/Projects";

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="flex">
      <LateralMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <div
        className={`transition-all duration-300 text-center ${
          menuOpen ? "ml-64" : "ml-0"
        } flex-1`}
      >
        <Header />
        <Projects />
      </div>
    </div>
  );
}
