"use client";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.includes("/signIn") || pathname.includes("/signUp")) {
    return (
      <html lang="en" className={`${poppins.variable}`}>
        <body>
          {children}
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en" className={`${poppins.variable}`}>
        <body>
          <NavBar />
          {children}
          {!pathname.includes("/journal") && <Footer />}
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </body>
      </html>
    );
  }
}
