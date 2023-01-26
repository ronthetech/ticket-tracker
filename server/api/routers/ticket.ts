import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

const ticketList = Prisma.validator<Prisma.TicketSelect>()({
  id: true,
  userId: true,
  subject: true,
  description: true,
  severity: true,
  assignee: true,
  status: true,
  createdAt: true,
  author: true,
})

export const ticketRouter = createTRPCRouter({
  getTickets: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany({ select: ticketList })
  }),

  getTicketByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.ticket.findUniqueOrThrow({
        select: ticketList,
        where: { id: input.id },
      })
    }),

  addTicket: publicProcedure
    .input(
      z.object({
        subject: z.string(),
        description: z.string(),
        severity: z.string(),
        assignee: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newTicket = await ctx.prisma.ticket.create({
        data: {
          subject: input.subject,
          description: input.description,
          severity: input.severity,
          assignee: input.assignee,
          userId: input.userId,
        },
      })
      return newTicket
    }),
})
