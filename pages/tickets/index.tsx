import { Layout } from "components/layout.tsx"
import TicketList from "components/tickets/TicketList"
import Head from "next/head"
import type { TicketT } from "types/ticket"

// const tickets: TicketT[] = [
//   {
//     _id: "1",
//     subject: "lagging",
//     description: "Mouse events are lagging",
//     severity: "Low",
//     assignee: "Alan",
//     status: "Open",
//   },
//   {
//     _id: "2",
//     subject: "crash",
//     description: "Computer crashes when I open program",
//     severity: "High",
//     assignee: "Luke",
//     status: "Open",
//   },
//   {
//     _id: "3",
//     subject: "no notifications",
//     description: "Not receiving my notifications",
//     severity: "Medium",
//     assignee: "Gail",
//     status: "Closed",
//   },
//   {
//     _id: "4",
//     subject: "form submit",
//     description: "i cant submit my form entry",
//     severity: "Low",
//     assignee: "Ernie",
//     status: "Open",
//   },
// ]

const getTickets = (): Promise<TicketT[]> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  fetch("https://rjf-manager-server.onrender.com/tickets").then((response) =>
    response.json()
  )

export const getServerSideProps = async () => {
  // const res = await fetch("https://rjf-manager-server.onrender.com/tickets")

  return {
    props: { initialData: await getTickets() },
  }
}

function TicketsHome({ initialData }: { initialData: TicketT[] }) {
  return (
    <Layout>
      <Head>
        <title>Ticket Tracker</title>
        <meta name="description" content="Ticket Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="my-4 mx-auto max-w-3xl rounded p-3">
        <h1 className="text-red-800">Tickets</h1>

        <article className="my-3 rounded border bg-slate-400/20 p-5 lg:my-8">
          <ul>
            <TicketList tickets={initialData} />
          </ul>
        </article>
      </section>
    </Layout>
  )
}

export default TicketsHome
