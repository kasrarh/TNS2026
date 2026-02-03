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
    icon: "/favicon.ico"
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T6GJX9XN');
            `,
          }}
        />
        <link rel="stylesheet" href="https://use.typekit.net/voo2uat.css" />

      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T6GJX9XN"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
