import Link from "next/link"
import type { TicketT } from "types/ticket"

const TicketList = ({ tickets }: { tickets: TicketT[] }) => {
  return (
    <>
      {tickets.map((ticket) => (
        <li
          key={ticket._id}
          {...ticket}
          className="my-3 rounded border bg-slate-400/20 p-5 lg:my-8">
          <div className="flex items-center gap-3">
            <Link href={`/tickets/${ticket._id}`}>
              <p className="text-lg">Ticket ID: {ticket._id}</p>
            </Link>
            <span
              className={`pointer-events-none rounded-full py-1 px-2 text-sm font-semibold text-white shadow-md${
                ticket.status === "Closed"
                  ? " bg-fuchsia-700/70"
                  : " bg-red-500/70"
              }`}>
              {ticket.status}
            </span>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-800" />
            </div>
          </div>

          <h3>{ticket.subject}</h3>
          <div className="rounded-3 my-3 border border-slate-300 bg-slate-200/20 p-2">
            <p className="text-slate-800">{ticket.description}</p>
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

          <div className="mt-3 flex gap-4">
            <Link
              href={`/tickets/update/${ticket._id}`}
              className="btn-primary rounded-lg border border-slate-200 bg-slate-500/40 py-1 px-2 font-semibold uppercase text-white shadow-md hover:bg-slate-500/70 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-slate-700 dark:bg-slate-100/20 dark:text-slate-100 dark:hover:bg-slate-100/70 dark:hover:text-slate-800 sm:py-1 sm:px-2">
              Edit
            </Link>

            {/* <button className="rounded-lg py-1 px-2 font-semibold uppercase text-white shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 sm:py-1 sm:px-2 btn-warn" onClick={() => handleTicket(ticket._id, ticket.status)}>
                  {ticket.status === "Open" ? "Close" : "Open"}
                </button> */}

            <button
              onClick={() => console.log("deleted")}
              className="btn-danger rounded-lg border border-slate-200 bg-red-600 py-1 px-2 font-semibold uppercase text-white shadow-md hover:bg-red-600/70 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-red-700 dark:text-slate-100 dark:hover:text-slate-200/70 sm:py-1 sm:px-2">
              Delete
            </button>
          </div>
        </li>
      ))}
    </>
  )
}
export default TicketList
