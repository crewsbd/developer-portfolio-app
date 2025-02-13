
import PortfolioEditor from "@/components/PortfolioEditor";

// import { SessionProvider } from "next-auth/react";

export default async function Page({ params }: { params: { id: string } }) {

  params = await params;
  console.log("ID " + params.id);

  const numberId = await Number.parseInt(params.id);
  return (
      <PortfolioEditor id={numberId} />
    // <Portfolio id={numberId} />
  );
}
