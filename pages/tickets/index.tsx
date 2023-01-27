import { Layout } from "components/layout"
import Spinner from "components/spinner"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "utils/api"

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

// const getTickets = (): Promise<TicketT[]> =>
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   fetch("https://rjf-manager-server.onrender.com/tickets").then((response) =>
//     response.json()
//   )

// export const getServerSideProps = async () => {
//   // const res = await fetch("https://rjf-manager-server.onrender.com/tickets")

//   return {
//     props: { initialData: await getTickets() },
//   }
// }

function TicketsHome() {
  const router = useRouter()
  const { data, isLoading } = api.ticket.getTickets.useQuery()

  const deleteTicket = api.ticket.deleteTicket.useMutation({
    onSuccess: () => {
      router.reload()
    },
  })

  const handleDelete = (id: string) => {
    deleteTicket.mutate({ id })
  }

  if (!data) {
    return <></>
  }
  if (isLoading) {
    return <Spinner />
  }

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

        <article className="my-3 rounded p-5">
          <ul>
            {data.map((ticket) => (
              <li
                key={ticket.id}
                className="my-3 rounded border bg-slate-400/70 p-5 lg:my-8">
                <div className="flex items-center gap-3">
                  <Link href={`/tickets/${ticket.id}`}>
                    <p className="text-lg" id={ticket.id}>
                      Ticket ID: {ticket.id}
                    </p>
                  </Link>
                  <span
                    className={`pointer-events-none rounded-full py-1 px-2 text-sm font-semibold text-slate-300 shadow-md${
                      ticket.status == true
                        ? " bg-red-600/70"
                        : " bg-fuchsia-700/50"
                    }`}>
                    {ticket.status == true ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-2">
                    <div className="border-t border-gray-800" />
                  </div>
                </div>

                <h2>{ticket.subject}</h2>
                <div className="rounded-3 m-4 border border-slate-300 bg-slate-200/20 p-4 dark:bg-slate-900/40">
                  <p className="text-slate-800 dark:text-slate-100">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex gap-6 font-bold">
                  <p>{ticket.severity}</p>
                  <p>{ticket.assignee}</p>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-800" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/tickets/update/${ticket.id}`}
                    className="rounded-lg border border-slate-700 bg-slate-500/40 py-1 px-2 font-semibold uppercase text-slate-900 shadow-md hover:border-slate-200 hover:bg-slate-500/70 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-100/70 dark:hover:text-slate-800 sm:py-1 sm:px-2">
                    Edit
                  </Link>

                  {/* <button className="rounded-lg py-1 px-2 font-semibold uppercase text-white shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 sm:py-1 sm:px-2 btn-warn" onClick={() => handleTicket(ticket._id, ticket.status)}>
                  {ticket.status === "Open" ? "Close" : "Open"}
                </button> */}

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="rounded-lg border border-red-700 bg-red-600 py-1 px-2 font-semibold uppercase text-white shadow-md hover:border-slate-200 hover:bg-red-600/70 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-red-700 dark:text-slate-100 dark:hover:text-slate-200/70 sm:py-1 sm:px-2">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </Layout>
  )
}

export default TicketsHome
