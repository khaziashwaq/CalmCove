"use client";

import React, { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";

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
    <div className="flex h-screen flex-col items-center justify-center">
      {mounted && (
        <div className="min-w-fit mt-[55px] overflow-hidden shadow-xl">
          <Calendar
            onClick={(day, month, year) => {
              console.log(`Clicked on ${monthNames[month]} ${day}, ${year}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
