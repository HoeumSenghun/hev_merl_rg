import type { Metadata } from "next";
import { Geist, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hev Merl Rg",
    template: "%s · Hev Merl Rg",
  },
  description: "ហេវមើលរឿង — search movies and open a poster, year, and plot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${notoSansKhmer.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
