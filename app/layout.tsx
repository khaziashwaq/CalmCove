import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { Poppins, Roboto_Mono } from 'next/font/google'

 
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </body>
    </html>
  );
}
