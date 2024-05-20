import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

import { webData } from "@/data/website";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: webData.title,
  description: webData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.className} antialiased`}>
        <AuthContextProvider>
          <Navbar/>
          <div className='mt-[48px] md:mt-[84px] text-black'>
            {children}
          </div>
          <Footer/>
          </AuthContextProvider>
        {/* <Spinner/> */}
      </body>
    </html>
  );
}
