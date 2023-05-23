# Quick Links

- Hosted at Vercel

## Stack

This repo uses the following technologies:

- Node 18
- PNPM
- Typescript
- Turborepo
- NextJS 13
- React 18
- Auth.js (formerly known as NextAuth.js) - Refactor after we confirm its working to use AWS Cognito.
- Prisma
- tRPC v10
- TailwindCSS
- Vercel - Potentially switch to netlify for consistency across other projects.
- Upstash - refactor for AWS

DB

- PlanetScale

## Folder Structure

```
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# If you'd like to use a different database other than SQLite, you can go
# to packages/db/prisma and update schema.prisma provider
# or use your own database provider
+ provider = "mysql"

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db:push
```

## Set up login providers

This app has Discord and Google as login options. If you want to run it locally and be able to log in, you need to have one of these two options set up.

Here's how to set up Google:

- [Create a Google developer application](https://console.developers.google.com/apis/credentials)
- Grab your client ID and client secret and add them to your `.env` file as `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET`

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

> The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
