"use client"

import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-transparent fixed w-full top-0 left-0 z-20 shadow-md ${
        isScrolled ? "backdrop-blur-2xl" : ""
      } transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logotype */}
        <a href="/" className="sm:text-3xl text-xl font-black text-white">
          retomizer
        </a>

        {/* Docs Button */}
        <button className="px-8 py-1 font-medium text-sm border-2 text-gray-300 rounded-xl mt-0 bg-transparent transition-all duration-700 ease-in-out  animate-border-transition">
          Docs
        </button>
      </div>
    </nav>
  );
};

export default Navbar;