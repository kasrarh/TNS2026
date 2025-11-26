import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TNS 2026",
  description: "True North Summit 2026 - Embracing the Future of Technology",
   icons: {
    icon:  "/favicon.ico"
    // apple: '/TNS2026-logo.png',
    // You can also define icons based on media queries for dark/light mode:
    // icon: [
    //   { url: '/light-icon.png', media: '(prefers-color-scheme: light)' },
    //   { url: '/dark-icon.png', media: '(prefers-color-scheme: dark)' },
    // ],
  },
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/voo2uat.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
