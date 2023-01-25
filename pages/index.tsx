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
            className="h-11 rounded-md bg-slate-900 px-8 text-white hover:bg-slate-700 dark:bg-slate-300 dark:text-slate-900">
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className="h-11 rounded-md border border-slate-200 bg-transparent px-8 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100">
            GitHub
          </Link>
        </div>
      </section>
    </Layout>
  )
}
