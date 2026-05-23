"use client";

import Link from "next/link";
import { auth, signOutUser } from "@/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/components/UserIcon";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsMenuOpen(false);
      await signOutUser();
      router.push("/signIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleHomeClick = () => {
    setActiveSection(null);
  };

  const navLinkClass = (isActive: boolean) =>
    `relative block rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-steel-500 text-white"
        : "text-steel-700 hover:text-steel-500"
    }`;

  return (
    <nav className="sticky top-0 z-[100] w-full">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 group"
          onClick={handleHomeClick}
        >
          <span className="self-center text-lg sm:text-xl font-heading font-bold tracking-tight text-steel-800 transition-colors group-hover:text-steel-600">
            CalmCove
          </span>
        </Link>

        <div className="hidden md:flex items-center md:order-1">
          <ul className="flex flex-row rounded-2xl p-1 font-medium space-x-1">
            <li>
              <Link
                href="/"
                onClick={handleHomeClick}
                className={navLinkClass(pathname === "/" && !activeSection)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className={navLinkClass(pathname === "/stories")}
              >
                Stories
              </Link>
            </li>
            <li>
              {user ? (
                <Link
                  href="/journal"
                  className={navLinkClass(pathname === "/journal")}
                >
                  Journal
                </Link>
              ) : (
                <Link
                  href="/signIn"
                  className={navLinkClass(pathname === "/journal")}
                >
                  Journal
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 md:order-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-steel-50 text-steel-700 transition-all duration-300 hover:bg-steel-100 focus:outline-none focus:ring-2 focus:ring-steel-300/40"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-56 rounded-2xl border border-sand-200/60 bg-white/90 backdrop-blur-xl py-1 shadow-warm"
                  >
                    <div className="border-b border-sand-100 px-4 py-3">
                      <p className="text-xs text-steel-400">Signed in as</p>
                      <p className="truncate text-sm font-medium text-steel-700">
                        {user.email || "User"}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm text-steel-700 transition-color rounded-lg mx-1"
                      >
                        Your Profile
                      </Link>
                    </div>
                    <div className="border-t border-sand-100 py-1">
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2.5 text-left text-sm text-rose-500 transition-color rounded-lg mx-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/signIn"
              className="text-sm px-4 sm:px-5 py-2 rounded-full bg-steel-500 text-white font-medium hover:bg-steel-600 transition-colors duration-200"
            >
              Sign Up
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-steel-700 hover:bg-steel-50 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileNavOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-sand-200/40 bg-sand-50/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col px-4 py-3 space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={() => {
                    handleHomeClick();
                    setIsMobileNavOpen(false);
                  }}
                  className={navLinkClass(pathname === "/" && !activeSection)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  onClick={() => setIsMobileNavOpen(false)}
                  className={navLinkClass(pathname === "/stories")}
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href={user ? "/journal" : "/signIn"}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={navLinkClass(pathname === "/journal")}
                >
                  Journal
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
