import { siteConfig } from "config/site"
import Link from "next/link"
import type { NavItem } from "types/nav"
import { Icons } from "./icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm ${
                    item.disabled ? "cursor-not-allowed opacity-80" : ""
                  }`}>
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="-ml-4 bg-transparent text-base hover:bg-transparent hover:bg-slate-100 focus:ring-0 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-transparent md:hidden">
            <Icons.logo className="mr-2 h-4 w-4" />{" "}
            <span className="font-bold">Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[300px] overflow-scroll">
          <DropdownMenuLabel>
            <Link href="/" className="flex items-center">
              <Icons.logo className="mr-2 h-4 w-4" /> {siteConfig.name}
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
