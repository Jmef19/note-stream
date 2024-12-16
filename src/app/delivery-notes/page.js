"use client";

import { useState } from "react";

import Header from "@/components/Header";
import LateralMenu from "@/components/LateralMenu";
import DeliveryNotes from "@/components/DeliveryNotes";

export default function DeliveryNotePage() {
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
        <DeliveryNotes />
      </div>
    </div>
  );
}
