"use client";

import { motion } from "framer-motion";

interface ScribbleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const ScribbleButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: ScribbleButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative font-journal text-lg px-10 py-4 text-steel-700 ${className}`}
    >
      <img
        src="/scribble-btn.svg"
        alt=""
        className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default ScribbleButton;
