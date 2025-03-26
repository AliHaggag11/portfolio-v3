import type { Metadata } from "next";
import { Inter, Calistoga, Afacad } from "next/font/google";
import { LoadingBar } from "@/components/LoadingBar";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"]
});
const afacad = Afacad({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ali Codes",
  description: "Welcome to my world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={twMerge(inter.variable, calistoga.variable, afacad.className, "bg-gray-900 text-white antialiased font-sans relative min-h-screen")}>
      <body>
        <LoadingBar />
        {children}
      </body>
    </html>
  );
}
