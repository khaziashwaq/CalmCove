"use client";

import Stories from "@/components/Stories";
import { motion } from "framer-motion";

export default function StoriesPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Stories />
    </motion.main>
  );
}
