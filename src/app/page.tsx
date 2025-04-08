// import Section from '@/components/Section';
import { getPortfolioNames } from "./lib/data";
import Link from "next/link";

export default async function Page() {
  "use server";

  const portfolios = await getPortfolioNames();

  return (
    <>
      <h2>Home Page</h2>
      {portfolios.map((portfolio) => {
        return (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
            {portfolio.user.name}
          </Link>
        );
      })}
      <Link href={{ pathname: "/signin" }}>Sign in</Link>
      <Link href={{ pathname: "/signout" }}>Sign out</Link>
    </>
  );
}
