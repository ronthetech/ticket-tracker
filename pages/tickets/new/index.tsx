import { Layout } from "components/layout"
import AddTicketForm from "components/tickets/AddTicketForm"
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
        <AddTicketForm />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NewTicketPage
