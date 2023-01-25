import "../styles/globals.css"

import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import type { AppType } from "next/app"

import { api } from "../utils/api"

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
