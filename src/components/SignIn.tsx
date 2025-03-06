import { signIn } from "@/auth";
import styles from "@/components/SignInOut.module.css";


export default async function SignIn() {
  "use server";


  return (
    <form
      className={styles.authentication}
      action={async () => {
        "use server";
        await signIn("github", { redirect: true, redirectTo: "/" });
      }}
    >
      <h3>Sign In</h3>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}
