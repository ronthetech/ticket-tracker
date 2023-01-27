import { Layout } from "components/layout"
import Spinner from "components/spinner"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "utils/api"

type UpdateTicketInput = {
  subject: string
  description: string
  severity: string
  assignee: string
  status: string
}

const EditTicket: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const { data: sessionData } = useSession()

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

  const editTicket = api.ticket.updateTicket.useMutation({
    onSuccess: async ({ id }) => {
      await router.push(`/tickets/${id}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTicketInput>()

  const onSubmit = (values: UpdateTicketInput) => {
    const str2bool = (value: string) => {
      if (value === "true") return true
      return false
    }

    editTicket.mutate({ ...values, status: str2bool(values.status), id: id })
    if (sessionData === null) {
      setErrorMessage("You must be signed in to continue.")
    } else if (sessionData.user === undefined) {
      setErrorMessage("You need an account to continue.")
    }
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <button
                type="submit"
                className="rounded-lg border border-slate-700 bg-slate-500/40 py-1 px-2 font-semibold uppercase text-slate-900 shadow-md hover:border-slate-200 hover:bg-slate-500/70 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-slate-700 dark:bg-slate-100/20 dark:text-slate-100 dark:hover:bg-slate-100/70 dark:hover:text-slate-800 sm:py-1 sm:px-2">
                Save
              </button>

              {/* <button className="btn btn-warn" onClick={() => handleTicket(ticket._id, ticket.status)}>
                  {ticket.status === "Open" ? "Close" : "Open"}
                </button> */}

              <button
                onClick={() => handleDelete(data.id)}
                className="rounded-lg border border-red-700 bg-red-600 py-1 px-2 font-semibold uppercase text-white shadow-md hover:border-slate-200 hover:bg-red-800/90 focus:outline-none focus:ring-2 focus:ring-opacity-75 dark:border-red-700 dark:text-slate-100 dark:hover:text-slate-200/70 sm:py-1 sm:px-2">
                Delete
              </button>
            </div>

            <div className="block" aria-hidden="true">
              <div className="py-3 lg:py-5">
                <div className="border-t border-gray-800 dark:border-gray-300" />
              </div>
            </div>

            {/* UPDATE FORM */}
            <div className="grid grid-cols-6 gap-6 sm:ml-10">
              {/* subject */}
              <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="subject"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Subject
                </Label>
                <Input
                  aria-required="true"
                  type="text"
                  id="subject"
                  defaultValue={data.subject}
                  {...register("subject", { required: true })}
                  className="focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
                <span className="mb-2 inline-flex h-2">
                  {errors.subject && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      Subject is required
                    </p>
                  )}
                </span>
              </div>

              {/* description */}
              <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="description"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Description
                </Label>
                <Input
                  aria-required="true"
                  type="text"
                  id="description"
                  defaultValue={data.description}
                  {...register("description", { required: true })}
                  className="focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
                <span className="mb-2 inline-flex h-2">
                  {errors.description && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      Description is required
                    </p>
                  )}
                </span>
              </div>

              {/* severity */}
              <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="severity"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Severity
                </Label>
                <select
                  id="severity"
                  defaultValue={data.severity}
                  className="my-1 flex h-10 w-full rounded-md border border-slate-700 bg-transparent py-2 px-3 text-sm placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                  {...register("severity", {
                    required: true,
                    min: 3,
                  })}>
                  <option
                    aria-disabled
                    disabled
                    className="text-black"
                    value="">
                    Choose an option...
                  </option>
                  <option className="text-black" value="Low">
                    Low
                  </option>
                  <option className="text-black" value="Medium">
                    Medium
                  </option>
                  <option className="text-black" value="High">
                    High
                  </option>
                </select>
                <span className="mb-2 inline-flex h-2">
                  {errors.severity && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      Severity is required
                    </p>
                  )}
                </span>
              </div>

              {/* assignee */}
              <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="assignee"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Assigned To
                </Label>
                <Input
                  aria-required="true"
                  type="text"
                  id="assignee"
                  defaultValue={data.assignee}
                  {...register("assignee", { required: true })}
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
                <span className="mb-2 inline-flex h-2">
                  {errors.assignee && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      You must assign this ticket to a user
                    </p>
                  )}
                </span>
              </div>

              {/* status */}
              {/* <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="status"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Status
                </Label>
                <select
                  id="status"
                  defaultValue={data.status.toString()}
                  className="my-1 flex h-10 w-full rounded-md border border-slate-700 bg-transparent py-2 px-3 text-sm placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                  {...register("status", {
                    required: true,
                    min: 3,
                  })}>
                  <option
                    aria-disabled
                    disabled
                    className="text-black"
                    value="">
                    Choose an option...
                  </option>
                  <option
                    className="text-black"
                    value={data.status === true ? "true" : "false"}>
                    {data.status === true ? "true" : "false"}
                  </option>
                  <option
                    className="text-black"
                    value={data.status === false ? "false" : "true"}>
                    {data.status === true ? "false" : "true"}
                  </option>
                </select>
                <span className="mb-2 inline-flex h-2">
                  {errors.status && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      Status is required
                    </p>
                  )}
                </span>
              </div> */}

              <div className="col-span-6 sm:col-span-5">
                <Label
                  htmlFor="status"
                  className="block text-base font-medium text-gray-700 dark:text-slate-200">
                  Status
                </Label>
                <span className="my-1 flex h-10 w-full rounded-md border border-slate-700 bg-transparent py-2 px-3 text-sm placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                  <Label
                    htmlFor="status"
                    className="block text-base font-medium text-gray-700 dark:text-slate-200">
                    Open
                  </Label>
                  <input
                    type="radio"
                    id="true"
                    defaultValue={data.status.toString()}
                    className="mx-3"
                    {...register("status", {
                      required: true,
                    })}
                    name="status"
                    value="true"
                  />
                  <Label
                    htmlFor="status"
                    className="block text-base font-medium text-gray-700 dark:text-slate-200">
                    Closed
                  </Label>
                  <input
                    type="radio"
                    id="false"
                    className="mx-3"
                    {...register("status", {
                      required: true,
                    })}
                    name="status"
                    value="false"
                  />
                </span>
                <span className="mb-2 inline-flex h-2">
                  {errors.status && (
                    <p className="decoration-3 border-x border-t border-x-red-900 border-t-red-900 font-bold text-red-800 underline decoration-red-900 dark:text-red-100">
                      Status is required
                    </p>
                  )}
                </span>
              </div>

              <span className="col-span-6 h-0.5 sm:col-span-5">
                {errorMessage && (
                  <p className="decoration-3 font-bold text-red-900 underline decoration-red-900 dark:text-red-200">
                    {errorMessage}
                  </p>
                )}
              </span>
            </div>
          </form>
        </article>
      </section>
    </Layout>
  )
}
export default EditTicket
