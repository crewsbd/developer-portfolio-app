import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Developer portfolios",
  icons: "/favicon.svg",
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
            <Image
              src="/base/white-logo.svg"
              width={50}
              height={50}
              alt="Site logo"
            />
            <div className="title">
              <h1>
                <Link href={`/`}>Developer Portfolio</Link>
              </h1>
              <div>{session ? session.user?.name : "\u00A0"} </div>
            </div>
            <div>
              {session?.user?.image ? (
                <Image
                  className="portrait"
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt="Profile image"
                ></Image>
              ) : null}
            </div>
          </header>
          <main>{children}</main>
          <footer></footer>
        </body>
      </SessionProvider>
    </html>
  );
}
