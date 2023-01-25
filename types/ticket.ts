export type NewTicketT = {
  subject: string
  description: string
  severity: string
  assignee: string
}

export type TicketT = {
  _id: string
  subject: string
  description: string
  severity: string
  assignee: string
  status: string
}
