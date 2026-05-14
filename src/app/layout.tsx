import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ACM SVNIT — Association for Computing Machinery",
  description:
    "The student chapter of the Association for Computing Machinery at NIT Surat. Building technology. Building people.",
  keywords: [
    "ACM",
    "SVNIT",
    "NIT Surat",
    "Computer Science",
    "Technology",
    "Student Chapter",
    "Computing Machinery",
  ],
  openGraph: {
    title: "ACM SVNIT",
    description:
      "The student chapter of the Association for Computing Machinery at NIT Surat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
