import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar, DiffusedCursor } from "@/components";

export const metadata: Metadata = {
  title: "MemoirVeritas | rudra-xi",
  description:
    "Capturing genuine moments and timeless stories through the honest lens of a passionate photographer.",
};

// Loads the Rosaline font.
const rosaline = localFont({
  src: [
    {
      path: "../fonts/RosalineRegular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-rosaline",
});

// Loads the Sora variable font.
const sora = localFont({
  src: [
    {
      path: "../fonts/SoraVariable.woff2",
      weight: "100 200 300 400 500 600 700 800",
      style: "normal",
    },
  ],
  variable: "--font-sora",
});

/**
 * @component RootLayout
 * @description This is the root layout for the entire application, setting up
 * the basic HTML structure. It loads and applies custom local fonts (`Rosaline`
 * and `Sora`) using CSS variables. The layout includes the main navigation
 * bar and a custom cursor, wrapping the main page content (`children`) to
 * ensure a consistent look and feel across all pages.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rosaline.variable} ${sora.variable} max-h-screen w-full noise`} // Applies fonts and base styles.
      >
        <>
          <DiffusedCursor /> {/* Renders the custom cursor. */}
        </>
        <>
          <Navbar /> {/* Renders the main navbar. */}
          <main className="min-h-screen min-w-full">
            {children} {/* Renders the active page. */}
          </main>
        </>
      </body>
    </html>
  );
}
