"use client";

import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="scroll-to-top"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-700 p-2 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-brand-secondary"
    >
      <ArrowUp size={20} />
    </button>
  );
}
