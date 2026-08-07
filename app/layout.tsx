import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alethia | Environmental Intelligence & Science-Backed Strategy",
  description: "End-to-end environmental intelligence powered by science, blockchain, and transparent data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060b07] text-[#f5f4f2] antialiased overflow-x-hidden selection:bg-[#c6f19d]/30 selection:text-[#c6f19d]">
        {children}
      </body>
    </html>
  );
}
