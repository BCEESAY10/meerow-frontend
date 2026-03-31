import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6EE] dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE]">
      <Navbar />
      <main
        className={`flex-1 container mx-auto px-4 py-8 max-w-6xl w-full ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
