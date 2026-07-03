import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FUNTECH BRAND IDENTITY",
  description:
    "Marking our 10th anniversary, FunTech unveils a renewed Corporate Identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
