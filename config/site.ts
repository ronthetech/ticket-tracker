import type { NavItem } from "types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Ticket Tracker",
  description: "Ticket Tracker.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    { title: "Tickets", href: "/tickets" },
  ],
  links: {
    twitter: "https://twitter.com/ronjtech",
    github: "https://github.com/ronthetech",
  },
}
