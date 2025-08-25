import type { Metadata } from "next";
// Import the new font
import { Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Configure the font
const orbitron = Orbitron({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Atlantis Project",
  description: "A dashboard for the Atlantis project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={`${orbitron.className} bg-slate-900`}>
        <Header />
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}