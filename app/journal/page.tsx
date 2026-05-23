"use client";

import React, { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import { motion } from "framer-motion";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function journal() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-sand-50 px-2 sm:px-4">
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-full sm:min-w-fit mt-2 sm:mt-[55px] max-h-[calc(100vh-80px)] overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm border border-sand-200/40"
        >
          <Calendar
            onClick={(day, month, year) => {
              console.log(`Clicked on ${monthNames[month]} ${day}, ${year}`);
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
