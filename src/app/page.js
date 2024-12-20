"use client";

import { useState } from "react";
import LateralMenu from "@/components/LateralMenu";
import Header from "@/components/Header";
import Clients from "@/components/Clients";

export default function Home() {
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
        <Clients />
      </div>
    </div>
  );
}
