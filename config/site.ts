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
  name: "TrackerX",
  description: "Your new favorite Ticket Tracker.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    { title: "Tickets", href: "/tickets" },
    { title: "New", href: "/tickets/new" },
  ],
  links: {
    twitter: "https://twitter.com/ronjtech",
    github: "https://github.com/ronthetech",
  },
}
