import Head from "next/head"
import { SiteHeader } from "./site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Ticket Tracker</title>
        <meta name="description" content="Ticket Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="TicketTracker" />
        <meta name="application-name" content="TicketTracker" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#555555" />
      </Head>
      <SiteHeader />
      <main>{children}</main>
    </>
  )
}
