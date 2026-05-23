"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  heading: string;
  body: string;
}

const TestimonialCard = ({ heading, body }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="h-[320px] sm:h-[350px] lg:h-[380px] w-full max-w-[300px] card-calm p-5 sm:p-7 flex flex-col cursor-pointer"
    >
      <div className="flex-none">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📖</span>
          <span className="text-xs font-medium text-lavender-500 tracking-wide uppercase">
            Story
          </span>
        </div>
        <h2 className="text-lg font-medium mb-3 text-sand-800 leading-snug line-clamp-2">
          {heading}
        </h2>
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sand-600 text-sm leading-relaxed line-clamp-6">
          {body}
        </p>
      </div>
      <div className="flex-none mt-5 pt-4 border-t border-sand-200/40">
        <span className="text-sm font-medium text-lavender-500 hover:text-lavender-600 transition-colors">
          Read this story →
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
