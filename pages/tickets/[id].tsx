import { Layout } from "components/layout"
import Spinner from "components/spinner"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "utils/api"

const Ticket: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data, isLoading } = api.ticket.getTicketByID.useQuery({
    id: id,
  })

  const deleteTicket = api.ticket.deleteTicket.useMutation({
    onSuccess: async () => {
      await router.push("/tickets")
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
      <section className="my-4 mx-auto max-w-xl rounded p-3 lg:max-w-3xl">
        <article className="my-3 rounded border bg-slate-400/20 p-5 lg:my-8">
          <div className="flex items-center gap-3">
            <p className="text-lg">Ticket ID: {id}</p>
            <span
              className={`pointer-events-none rounded-full py-1 px-2 text-sm font-semibold text-slate-300 shadow-md${
                data.status == true ? " bg-red-600/70" : " bg-fuchsia-700/50"
              }`}>
              {data.status == true ? "Open" : "Closed"}
            </span>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-800" />
            </div>
          </div>

          <h2>{data.subject}</h2>
          <div className="rounded-3 m-4 border border-slate-300 bg-slate-200/20 p-4 dark:bg-slate-900/40">
            <p className="text-slate-800 dark:text-slate-100">
              {data.description}
            </p>
          </div>

          <div className="flex gap-6 font-bold">
            <p>{data.severity.toUpperCase()}</p>
            <p>{data.assignee}</p>
          </div>

          <div className="block" aria-hidden="true">
            <div className="py-3 lg:py-5">
              <div className="border-t border-gray-800 dark:border-gray-300" />
            </div>
          </div>

          <div className="mt-3 flex gap-4">
            <Link
              href={`/tickets/update/${data.id}`}
              className="rounded-lg border border-slate-700 bg-slate-500/40 py-1 px-2 font-semibold uppercase text-slate-900 shadow-md hover:border-slate-200 hover:bg-slate-500/70 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-slate-700 dark:bg-slate-100/20 dark:text-slate-100 dark:hover:bg-slate-100/70 dark:hover:text-slate-800 sm:py-1 sm:px-2">
              Edit
            </Link>

            {/* <button className="btn btn-warn" onClick={() => handleTicket(ticket._id, ticket.status)}>
                  {ticket.status === "Open" ? "Close" : "Open"}
                </button> */}

            <button
              onClick={() => handleDelete(data.id)}
              className="rounded-lg border border-red-700 bg-red-600 py-1 px-2 font-semibold uppercase text-white shadow-md hover:border-slate-200 hover:bg-red-800/90 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-red-700 dark:text-slate-100 dark:hover:text-slate-200/70 sm:py-1 sm:px-2">
              Delete
            </button>
          </div>
        </article>
      </section>
    </Layout>
  )
}
export default Ticket
