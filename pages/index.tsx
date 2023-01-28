import { Layout } from "components/layout"
import { siteConfig } from "config/site"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <>
        {/* <section className="relative flex min-h-fit w-full flex-col justify-center md:mt-24 md:block md:h-fit">
          <Image
            quality={100}
            priority
            height={1400}
            width={1400}
            style={{
              objectFit: "cover",
              objectPosition: "70%",
            }}
            src="/img/hero_pattern.png"
            alt="hero bug tracker"
            className="pointer-events-none absolute ml-96 select-none"
          />
          <div className="relative z-10 mx-auto max-w-7xl sm:top-1/4">
            <div className="flex max-w-2xl flex-col gap-8 px-4 md:max-xl:rounded md:max-xl:bg-white/30">
              <h1 className="-ml-1 text-5xl font-extrabold leading-tight tracking-tighter dark:text-slate-400 md:text-7xl">
                TrackerX
              </h1>
              <h2>
                Track Bugs <br className="hidden sm:inline" />
                without the hassle.
              </h2>
              <p className="max-w-xl text-lg text-gray-700">
                Seamless, and detailed issue tracking. Free. Open Source. And
                Production Ready.
              </p>
            </div>
          </div>
        </section> */}
        <section className="container relative grid items-center gap-6 md:block md:py-10">
          <Image
            quality={100}
            priority
            height={1200}
            width={1200}
            style={{
              objectFit: "cover",
            }}
            src="/img/hero_pattern.png"
            alt="hero bug tracker"
            className="pointer-events-none absolute right-1/3 top-0 select-none sm:ml-40 md:right-0 lg:mt-0"
          />
          <div className="relative top-1/4 z-10 mt-24 flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              Track Tickets <br className="inline" />
              without the hassle.
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              Seamless, and detailed issue tracking.
              <br className="inline" /> Free. Open Source. And Production Ready.
            </p>
          </div>
          <div className="mt-12 flex gap-4">
            <Link
              href="/tickets/new"
              className="inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:border dark:bg-slate-300 dark:text-slate-900 dark:hover:border-slate-600 dark:hover:bg-[hsl(272,82%,45%)]/20 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-transparent px-8 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:border-slate-700 dark:bg-gray-700/30 dark:text-slate-100 dark:hover:bg-[hsl(272,82%,45%)]/60 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
              Learn More
            </Link>
          </div>
        </section>
      </>
    </Layout>
  )
}
