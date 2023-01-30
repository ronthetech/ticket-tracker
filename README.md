# TrackerX

## [Demo](https://trackerx.vercel.app)

![hero](https://github.com/ronthetech/ticket-tracker/blob/main/public/img/0.png?raw=true)

A Web-based platform for tracking and managing issues. Users can easily create, track, and resolve bugs, and other tasks.

## Create

![create](https://github.com/ronthetech/ticket-tracker/blob/main/public/img/1.png?raw=true)

## Tickets

Help your team stay organized, documenting issues efficiently and effectively.

![tickets](https://github.com/ronthetech/ticket-tracker/blob/main/public/img/2.png?raw=true)

---

## Technology

Next.js allows you to build optimized full stack React applications. TypeScript provides type-safety for your code while also allowing for a great developer experience, because of features like auto-completion.

I implemented tRPC for the APIs, allowing type-safety on both the front end and on the back end. tRPC allows you to keep the back end logic type-safe and within the same parameters that you set up and use on the front end. I used Prisma to handle the database because they use a type-safe API that lets you query your database that works with MySQL and even MongoDB. The pairing of tRPC and Prisma are a powerful combination for building full stack type-safe applications.

Styling was done with TailwindCSS and Radix-UI, which both help you build beautiful and responsive designs without extra configuration. You have so many choices for designing applications with Tailwind because its so customizable and extendable.

I chose NextAuth (Authjs) for authentication because they integrate so well with Prisma and the database and they provide a seamless way to ensure a user is signed in before they can perform certain actions. NextAuth makes it easier to handle setting up authentication and manage users and sessions in a Next.js web application.
