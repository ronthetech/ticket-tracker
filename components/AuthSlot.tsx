import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const AuthSlot: React.FC = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { data: sessionData } = useSession()

  const handleAuth = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (sessionData) {
      const data = await signOut({ redirect: false, callbackUrl: "/" })
      await router.push(data.url)
    } else {
      await signIn()
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {sessionData || pathname === "/register" ? (
        <></>
      ) : (
        <Link
          className="m-0 w-20 rounded-md border bg-slate-900 p-1 text-center text-base font-semibold text-white no-underline transition-colors hover:border-slate-700 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border dark:border-slate-600 dark:bg-slate-300 dark:text-slate-900 dark:hover:border-slate-300 dark:hover:bg-[hsl(272,82%,45%)]/20 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 lg:w-24 lg:py-2"
          href="/register"
          aria-label="Sign Up">
          Sign Up
        </Link>
      )}
      <button
        className="m-0 w-20 rounded-md bg-[hsl(272,82%,45%)] p-1 text-base font-semibold text-white no-underline transition-colors hover:bg-[hsl(272,82%,45%)]/50 dark:border
        dark:border-slate-600 dark:bg-[hsl(272,82%,45%)]/20 dark:hover:border-slate-300 dark:hover:bg-[hsl(272,82%,45%)]/60 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 lg:w-24 lg:py-2"
        onClick={handleAuth}
        aria-label={sessionData ? "sign out" : "sign in"}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}

export default AuthSlot
