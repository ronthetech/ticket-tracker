import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "utils/api"

type AddTicketInput = {
  userId: string
  subject: string
  description: string
  severity: string
  assignee: string
  status: boolean
}

const AddTicketForm = () => {
  const [success, setSuccess] = useState(false)
  const { data } = useSession()

  const addTicket = api.ticket.addTicket.useMutation()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTicketInput>({
    defaultValues: {
      subject: "",
      description: "",
      assignee: "",
      status: true,
    },
  })

  const onSubmit = (values: AddTicketInput) => {
    if (data && data.user) {
      addTicket.mutate({ ...values, userId: data.user.id })
    } else {
      console.log("You must be in a session to continue")
      console.log(errors)
    }
    setSuccess(true)
  }

  return (
    <>
      {success ? (
        <section className="my-4 mx-auto max-w-3xl rounded bg-slate-400/70 p-3">
          <h1 className="text-white-800">Success!</h1>
          <div className="my-3 rounded border bg-[hsl(272,82%,45%)] p-5 lg:my-8">
            <Link href="/tickets" className="text-2xl hover:underline">
              Tickets
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="block">
            <h1 className="text-red-800">Add New Issue:</h1>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="rounded-t bg-gray-500/30 px-4 py-5 dark:bg-[rgba(0,0,0,0.5)] sm:px-6 sm:pb-0">
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
                            {...register("subject", { required: true })}
                            className="focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          />
                          <span className="mb-2 inline-flex h-2">
                            {errors.subject && (
                              <p className="decoration-3 font-bold text-red-800 underline dark:text-red-600">
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
                            {...register("description", { required: true })}
                            className="focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          />
                          <span className="mb-2 inline-flex h-2">
                            {errors.description && (
                              <p className="decoration-3 font-bold text-red-800 underline">
                                Description is required
                              </p>
                            )}
                          </span>
                        </div>

                        {/* severity */}
                        {/* <div className="col-span-6 sm:col-span-5">
              <Label
                htmlFor="severity"
                className="block text-sm font-medium text-gray-700 dark:text-slate-200">
                Severity
              </Label>
              <Select
                value={formSeverity}
                aria-required="true"
                {...register("severity", { required: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    onChange={() => setFormSeverity("Low")}
                    value="Low">
                    Low
                  </SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <span className="mb-4 flex h-6">
                {errors.severity && (
                  <p className="m-0 text-red-500">Severity is required</p>
                )}
              </span>
            </div> */}
                        <div className="col-span-6 sm:col-span-5">
                          <Label
                            htmlFor="severity"
                            className="block text-base font-medium text-gray-700 dark:text-slate-200">
                            Severity
                          </Label>
                          <select
                            id="severity"
                            className="my-1 flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                            {...register("severity", {
                              required: true,
                              min: 3,
                            })}>
                            <option
                              aria-disabled
                              selected
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
                              <p className="decoration-3 font-bold text-red-800 underline">
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
                            {...register("assignee", { required: true })}
                            className="focus:border-emerald-500 focus:ring-emerald-500"
                          />
                          <span className="mb-2 inline-flex h-2">
                            {errors.assignee && (
                              <p className="decoration-3 font-bold text-red-800 underline">
                                You must assign this ticket to a user
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end bg-gray-50  px-4 py-3 dark:bg-[rgba(0,0,0,0.5)] sm:pb-6 sm:pt-0">
                      <button
                        type="submit"
                        className="m-0 w-20 rounded-md bg-[hsl(272,82%,45%)] p-1 text-base font-semibold text-white no-underline transition-colors hover:bg-[hsl(272,82%,45%)]/50 dark:border
        dark:border-slate-600 dark:bg-[hsl(272,82%,45%)] dark:hover:border-slate-800 dark:hover:bg-[hsl(272,82%,45%)]/80 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 lg:w-24 lg:py-2">
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AddTicketForm