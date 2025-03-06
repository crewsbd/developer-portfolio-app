import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignIn />;
}
