import { Icons } from "components/icons"
import { Layout } from "components/layout"
import Spinner from "components/spinner"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import type { Ticket } from "types/ticket"
import { api } from "utils/api"

function TicketsHome() {
  const { data: sessionData } = useSession()
  const router = useRouter()

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [query, setQuery] = useState("")

  const { data, isLoading, isSuccess, isError, error } =
    api.ticket.getTickets.useQuery()

  useEffect(() => {
    if (isSuccess) {
      setTickets(data)
    }
  }, [data, isSuccess])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      return (
        ticket.id.toLowerCase().includes(query.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
        ticket.description.toLowerCase().includes(query.toLowerCase()) ||
        ticket.severity.toLowerCase().includes(query.toLowerCase()) ||
        ticket.assignee.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [query, tickets])

  const deleteTicket = api.ticket.deleteTicket.useMutation({
    onSuccess: () => {
      router.reload()
    },
  })

  const handleDelete = (id: string) => {
    if (sessionData === null) {
      setErrorMessage("You must be signed in to delete tickets.")
    } else if (sessionData.user === undefined) {
      setErrorMessage("You need an account to continue.")
    }
    deleteTicket.mutate({ id })
  }

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  if (isError) {
    setErrorMessage(error.message)
    return (
      <>
        <Layout>
          {errorMessage && (
            <p className="decoration-3 font-bold text-red-900 underline decoration-red-900 dark:text-red-200">
              {errorMessage}
            </p>
          )}
        </Layout>
      </>
    )
  }

  return (
    <Layout>
      <section className="my-4 mx-auto max-w-xl rounded p-3 md:max-w-3xl">
        <h1 className="text-red-800">Tickets</h1>
        <section className="my-2">
          <Label
            htmlFor="search"
            className="block text-xl font-medium text-gray-700 dark:text-slate-200">
            Search
          </Label>
          <Input
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </section>
        <article className="rounded">
          <ul>
            {filteredTickets.map((ticket) => (
              <li
                key={ticket.id}
                className="my-3 rounded border bg-slate-400/70 p-5 dark:text-black lg:my-8">
                <div className="flex items-center gap-3">
                  <Link href={`/tickets/${ticket.id}`}>
                    <p
                      className="text-sm font-semibold sm:text-lg"
                      id={ticket.id}>
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
                <div className="rounded-3 mx-2 my-4 border border-slate-300 bg-slate-200/20 p-2 dark:bg-gray-100/5 dark:text-slate-900 lg:m-4 lg:p-4">
                  <p className="font-medium text-black">{ticket.description}</p>
                </div>

                <div className="flex gap-6 font-bold">
                  <span className="flex rounded bg-white/10 p-1">
                    <Icons.timer className="h-5 w-5" />
                    {ticket.severity.toUpperCase()}
                  </span>
                  <span className="flex rounded bg-white/10 p-1">
                    <Icons.userIcon className="h-5 w-5" />
                    {ticket.assignee}
                  </span>
                </div>

                <div className="block" aria-hidden="true">
                  <div className="py-3 sm:py-5">
                    <div className="border-t border-gray-800" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/tickets/edit/${ticket.id}`}
                    className="flex items-center rounded-lg border border-slate-700 bg-slate-500/40 py-1 px-2 font-semibold uppercase text-slate-900 shadow-md hover:border-slate-200 hover:bg-slate-500/70 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-100/70 dark:hover:text-slate-800 sm:py-1 sm:px-2">
                    <Icons.save className="h-5 w-5" />
                    Edit
                  </Link>

                  {/* <button className="rounded-lg py-1 px-2 font-semibold uppercase text-white shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 sm:py-1 sm:px-2 btn-warn" onClick={() => handleTicket(ticket._id, ticket.status)}>
                  {ticket.status === "Open" ? "Close" : "Open"}
                </button> */}

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="flex items-center rounded-lg border border-red-700 bg-red-600 py-1 px-2 font-semibold uppercase text-white shadow-md hover:border-slate-200 hover:bg-red-600/70 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-red-700 dark:text-slate-100 dark:hover:text-slate-200/70 sm:py-1 sm:px-2">
                    <Icons.trash className="h-5 w-5" />
                    Delete
                  </button>
                  <span className="col-span-6 h-0.5 sm:col-span-5">
                    {errorMessage && (
                      <p className="decoration-3 font-bold text-red-900 underline decoration-red-900 dark:text-red-200">
                        {errorMessage}
                      </p>
                    )}
                  </span>
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
