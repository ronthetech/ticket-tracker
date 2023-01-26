import { Layout } from "components/layout.tsx"
import { siteConfig } from "config/site"
import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Ticket Tracker</title>
        <meta name="description" content="Ticket Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Track Tickets <br className="hidden sm:inline" />
            without the hassle.
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Seamless, detailed and _ ticket tracking. Free. Open Source. And
            Production Ready.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:border dark:bg-slate-300 dark:text-slate-900 dark:hover:border-slate-600 dark:hover:bg-[hsl(272,82%,45%)]/20 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-transparent px-8 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-[hsl(272,82%,45%)]/60 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
            GitHub
          </Link>
        </div>
      </section>
    </Layout>
  )
}
