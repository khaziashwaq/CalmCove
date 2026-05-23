"use client";

import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  description: string;
  link: string;
}

export default function ArticleCard({
  title,
  description,
  link,
}: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="max-w-sm card-calm p-7"
    >
      <h2 className="text-lg font-medium text-sand-800 mb-4 leading-snug">{title}</h2>
      <p className="text-sand-600 mb-6 text-sm leading-relaxed min-h-[100px]">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm px-5 py-2 rounded-full bg-steel-500 text-white font-medium hover:bg-steel-600 transition-colors duration-200"
      >
        Read More
      </a>
    </motion.div>
  );
}
