"use client";

import Link from "next/link";
import { auth, signOutUser } from "@/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/components/UserIcon";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Reset active section when navigating away from home
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

  const handleStoriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("stories");
    if (pathname !== "/") {
      router.push("/?section=stories");
    } else {
      document
        .getElementById("Stories")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("about");
    if (pathname !== "/") {
      router.push("/?section=about");
    } else {
      document.getElementById("About")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    setActiveSection(null);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3"
          onClick={handleHomeClick}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            CalmCove
          </span>
        </Link>

        <div className="flex items-center md:order-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-center text-white transition-all duration-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
              {isMenuOpen && (
                <div className="z-[100] absolute right-0 mt-2 w-56 rounded-lg bg-white py-1 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.isAnonymous ? "Anonymous User" : user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Your Profile
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signIn">
              <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Sign In
              </button>
            </Link>
          )}
        </div>

        <div className="hidden w-full items-center justify-between md:flex md:w-auto md:order-1">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
            <li>
              <Link
                href="/"
                onClick={handleHomeClick}
                className={`block rounded py-2 pl-3 pr-4 transition-colors ${
                  pathname === "/" && !activeSection
                    ? "text-blue-700"
                    : "text-gray-900"
                } md:bg-transparent md:p-0 hover:text-blue-700`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#About"
                onClick={handleAboutClick}
                className={`block rounded py-2 pl-3 pr-4 transition-colors ${
                  activeSection === "about" ? "text-blue-700" : "text-gray-900"
                } md:p-0 hover:text-blue-700`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#Stories"
                onClick={handleStoriesClick}
                className={`block rounded py-2 pl-3 pr-4 transition-colors ${
                  activeSection === "stories"
                    ? "text-blue-700"
                    : "text-gray-900"
                } md:p-0 hover:text-blue-700`}
              >
                Stories
              </a>
            </li>
            <li>
              {user ? (
                <Link
                  href="/journal"
                  className={`block rounded py-2 pl-3 pr-4 transition-colors ${
                    pathname === "/journal" ? "text-blue-700" : "text-gray-900"
                  } md:p-0 hover:text-blue-700`}
                >
                  Journal
                </Link>
              ) : (
                <Link
                  href="/signIn"
                  className={`block rounded py-2 pl-3 pr-4 transition-colors ${
                    pathname === "/journal" ? "text-blue-700" : "text-gray-900"
                  } md:p-0 hover:text-blue-700`}
                >
                  Journal
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
