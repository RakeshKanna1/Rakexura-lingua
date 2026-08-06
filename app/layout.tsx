import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LINGUA | Translation & Intent Engine",
  description: "Hindi, Tanglish & Hinglish Speech & Text Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
