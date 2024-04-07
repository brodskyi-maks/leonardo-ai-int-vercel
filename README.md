## Project Overview

- This project is a responsive web application built with Next.js and TypeScript, showcasing a user information entry system and displaying data fetched from a public GraphQL API. It utilizes Chakra UI for its component library to ensure a visually appealing and responsive design. The application features a blocking element that captures user details, displays paginated data from a GraphQL API, and supports direct linking to specific pages of data. User interactions with the data list open detailed views in modals. This document outlines the setup and operational aspects of the project.

## Key Features

- User Information Entry: A blocking element (modal/page) captures a username and job title before allowing access to the rest of the application. This information is persistently stored and can be viewed and edited post-submission.
- Data Display: Utilizes Apollo Client to fetch and display data from a public GraphQL API, specifically focusing on datasets that include images.
- Pagination: Implements a paginated view of the GraphQL data on an "Information Page," enabling direct URL access to specific pages.
- Detail Viewing: Clicking an item in the data list opens a modal displaying detailed information about the item.
- Responsive Design: Ensures a seamless user experience across mobile and desktop devices using Chakra UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
