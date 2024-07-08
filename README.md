This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project live demo

https://friends-in-flats-frontend.vercel.app

## Project Overview

This Next.js project allows users to register, create apartments, and add rooms to those apartments. The project uses Recoil and Recoil Persist for state management, Tailwind CSS for styling, React Icons for icons, and Supabase for the backend.

## Implemented Features and Functionalities

- Persistent State: The application remembers the user's session, so they remain logged in even after refreshing the page or reopening the tab.
- Input Validation and Error Alerts: Input fields are validated, and users are alerted to any errors.
- Loading Indicators: Loading indicators are displayed during data fetching or processing.
- Image Error Handling: Error indicators are shown if images fail to load.
- Responsive Design: The application is fully responsive, providing an optimal experience on both desktop and mobile devices.
- Secure Landlord Onboarding: Authentication using Supabase Auth ensures that only authorized landlords can register and manage properties.
- Apartment Search Functionality: Users can filter apartments by location or price or even both, making it easy to find suitable options.

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
