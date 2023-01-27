export type NewTicketT = {
  subject: string
  description: string
  severity: string
  assignee: string
}

export type Ticket = {
  id: string
  createdAt: Date
  userId: string
  subject: string
  description: string
  severity: string
  assignee: string
  status: boolean
}
