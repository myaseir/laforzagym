import type { Metadata } from "next";
import { Montserrat, Teko } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat" 
});

const teko = Teko({ 
  subsets: ["latin"], 
  variable: "--font-teko",
  weight: ['300', '400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: "LA FORZA | Elite Fitness & Tactical Strength Rawalpindi",
  description: "The ultimate sanctuary for high-performance training in Rawalpindi. Forge your legacy with state-of-the-art equipment and elite coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${teko.variable} font-sans bg-[#050505] text-white antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}