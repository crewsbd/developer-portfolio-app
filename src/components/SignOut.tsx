import { signOut } from "@/auth"
import styles from '@/components/SignInOut.module.css'

export default async function SignOut() {
  "use server"
  return (
    <form className={styles.authentication}
      action={async () => {
        "use server"
        await signOut();
      }}
    >
        <h3>Confirm sign out</h3>
      <button type="submit">Sign out</button>
    </form>
  )
} 