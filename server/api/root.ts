import { exampleRouter } from "./routers/example"
import { ticketRouter } from "./routers/ticket"
import { createTRPCRouter } from "./trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  ticket: ticketRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
