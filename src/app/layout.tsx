import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#667EEA',
};

export const metadata: Metadata = {
  title: "Anonymous Portfolio | Creative Developer",
  description: "A minimalist portfolio showcasing projects, skills, and tools. Built with cutting-edge web technologies.",
  keywords: ["portfolio", "developer", "web development", "react", "next.js"],
  authors: [{ name: "Anonymous" }],
  openGraph: {
    title: "Anonymous Portfolio",
    description: "Creative Developer Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Portfolio",
    description: "Creative Developer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  );
}