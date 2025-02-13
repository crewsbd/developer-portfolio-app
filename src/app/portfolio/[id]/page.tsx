"use server";
import Portfolio from "@/components/Portfolio";

export default async function Page({ params }: { params: { id: string } }) {
  "use server";
  console.log("ID: " + params.id);
  return <Portfolio id={Number.parseInt(params.id)} />;
}
