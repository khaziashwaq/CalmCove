"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { googleLogin, handleRedirectResult } from "@/firebaseConfig";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in or returning from redirect, go home
  useEffect(() => {
    handleRedirectResult().catch(() => {});
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const user = await googleLogin();
      if (user) router.push("/");
      // If null, redirect flow started — page will reload
    } catch (error: any) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-20 text-4xl opacity-15 select-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        🌙
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-3xl opacity-10 select-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        🍃
      </motion.div>

      <FadeIn delay={0.1}>
        <div className="w-full max-w-md space-y-8 card-calm p-10">
          <div className="text-center">
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🌿
            </motion.div>
            <h1 className="text-3xl font-light text-sand-900 mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sand-700 leading-relaxed">
              Take a breath. Your quiet space is here.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-rose-50 border border-rose-200/60 p-4"
            >
              <p className="text-sm text-rose-600">{error}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 text-base bg-gold-200 hover:bg-gold-300 text-sand-700 rounded-2xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? "Finding your space..." : "Continue with Google"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-sand-700 leading-relaxed">
            Your privacy matters to us. By continuing, you agree to our Terms of
            Service and Privacy Policy.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
