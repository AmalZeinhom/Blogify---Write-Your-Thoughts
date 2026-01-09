# Blogify - Next.js Blog Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open http://localhost:3000 
    with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

#Features
    #General Features

        - Responsive Design: Mobile-friendly layout for optimal viewing on all devices.

        - Dynamic Routing: Individual pages for blog posts and categories using Next.js dynamic routing.

        - Contact Form: Users can reach out via a contact form.

        - User Authentication: Secure login for admin users, managing access to dashboard features.

        - SEO Optimization: Add meta title and description for better search engine visibility.

        - Featured Images: Upload and display images for blogs stored in public/assets/blogs/.

    #Admin Dashboard Features

        #Blog Management

        - Create, edit, delete, and preview blogs.

        - Automatically generate URL-friendly slugs from titles.

        - Add content, categories, tags, and SEO meta information.

        - Switch blogs between draft and published status.

        #Blog Listing

        - Filter by title, category, and status.

        - Search blogs with real-time filtering.

        - Paginate blog listings using reusable pagination component.

        - Dashboard cards display total blogs, published blogs, drafts, and total views.

        #Animations & UX

        - Smooth UI transitions and hover effects powered by framer-motion.

        - Interactive buttons and badges for status, edit, preview, and delete actions.

    #Admin Access

        - Only users with the Admin role can delete blogs and access certain dashboard actions.

        - Authentication is handled via AuthContext:

            - useAuth() provides role and email.

        - Example: role === "Admin" enables admin-only features.

        - Admin can login via the url (http://localhost:3000/?admin=allowedAccess), 
        - then with password admin123.

#Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **CSS Modules**: For styling components locally.
- **ESLint**: For maintaining code quality and consistency.
- **PostCSS**: For processing CSS with various plugins.

## Installation

To install the project, clone the repository and run:

```bash
npm install
```

## Usage

After installation, run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
