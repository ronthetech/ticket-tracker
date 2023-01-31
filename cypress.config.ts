import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "https://trackerx.vercel.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
