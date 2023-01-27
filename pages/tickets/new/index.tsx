import { Layout } from "components/layout"
import AddTicketForm from "components/tickets/AddTicketForm"

const NewTicketPage = () => {
  return (
    <Layout>
      <section className="mx-auto flex max-w-2xl flex-col px-6 py-8 lg:max-w-5xl">
        <AddTicketForm />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-3 lg:py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NewTicketPage
