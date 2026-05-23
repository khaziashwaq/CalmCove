"use client";

import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";
import { FadeIn } from "@/components/animations";
import { motion } from "framer-motion";
import ScribbleButton from "@/components/ScribbleButton";

const INITIAL_STATE = {
  data: "empty here",
};

const signUp = () => {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  console.log(formState, "client");
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <FadeIn delay={0.1}>
        <div className="w-full max-w-md card-calm p-10">
          <div className="text-center mb-8">
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🌱
            </motion.div>
            <h1 className="text-2xl font-light text-sand-900 tracking-tight">
              Begin your journey
            </h1>
            <p className="text-sand-500 mt-2 text-sm">
              Create a space that&apos;s yours
            </p>
          </div>

          <form action={formAction} method="POST" className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-sand-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="input-calm"
                placeholder="Choose a name you love"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sand-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-calm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sand-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input-calm"
                placeholder="Something memorable"
              />
            </div>

            <ScribbleButton type="submit" className="w-full py-3.5 text-base">
              Create my space
            </ScribbleButton>
          </form>

          <p className="mt-8 text-center text-sm text-sand-500">
            Already have an account?{" "}
            <a
              href="/signIn"
              className="font-medium text-lavender-600 hover:text-lavender-700 transition-colors"
            >
              Welcome back
            </a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default signUp;
