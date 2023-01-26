import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const AuthSlot: React.FC = () => {
  const { data: sessionData } = useSession()

  const handleAuth = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (sessionData) {
      await signOut()
    } else {
      await signIn()
    }
  }

  return (
    <div className="flex items-center justify-center">
      {/* <p className="text-xl text-white">
        {sessionData ? <span>Logged in as {sessionData.user?.name}</span> : ""} 
      </p>*/}
      <button
        className="m-0 w-20 rounded-md bg-[#7076e7] p-1 text-base font-semibold text-white no-underline transition hover:bg-[#7076e7]/50 dark:bg-[#161930]
        dark:hover:bg-[#161930]/70 lg:w-24 lg:py-2"
        onClick={handleAuth}
        aria-label={sessionData ? "sign out" : "sign in"}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}

export default AuthSlot
