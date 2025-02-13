import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Developer portfolios",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <header>
            <h1>Developer Portfolio</h1>
            <div>{session ? session.user?.name : "\u00A0"} </div>
          </header>
          <main>{children}</main>
          <footer></footer>
        </body>
      </SessionProvider>
    </html>
  );
}
