import { Layout } from "components/layout.tsx"
import Head from "next/head"

const NewTicketPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ticket Tracker</title>
        <meta name="description" content="Ticket Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="mx-auto flex max-w-5xl flex-col px-6 py-8">
        {/* <h1 className="text-red-800">Tickets</h1> */}
        <>
          <div className="block">
            <h2>Add New Issue:</h2>
            <div className="py-2 lg:py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-slate-900 dark:text-slate-200">
                    Ticket Information
                  </h3>
                  <p
                    className="mt-1 text-base font-normal text-slate-600 dark:text-slate-400"
                    id="form-description">
                    Add a subject and detailed summary describing the issue.
                  </p>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
              </div>

              <div className="mt-5 md:col-span-2 md:mt-0">
                {/* <NewTicketForm /> */}
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </>
      </section>
    </Layout>
  )
}

export default NewTicketPage
