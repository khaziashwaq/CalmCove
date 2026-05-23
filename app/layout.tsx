"use client";
import "./globals.css";
import NavBar from "@/components/NavBar";
import AmbientBackground from "@/components/AmbientBackground";
import { usePathname } from "next/navigation";

import { Space_Mono, Manrope } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.includes("/signIn") || pathname.includes("/signUp")) {
    return (
      <html lang="en" className={`${spaceMono.variable} ${manrope.variable}`}>
        <head>
          <title>CalmCove</title>
          <link rel="icon" href="/tab.svg" type="image/svg+xml" />
        </head>
        <body className="bg-sand-50 h-screen overflow-hidden">
          <AmbientBackground />
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en" className={`${spaceMono.variable} ${manrope.variable}`}>
        <head>
          <title>CalmCove</title>
          <link rel="icon" href="/tab.svg" type="image/svg+xml" />
        </head>
        <body className="h-screen overflow-hidden flex flex-col bg-sand-50">
          <AmbientBackground />
          <NavBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </body>
      </html>
    );
  }
}
