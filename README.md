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
```

Or for docker:

```bash
# run the container
docker compose up --watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tests

Tests are automatically run via **GitHub Actions** on each push or pull request creation. You can track the status of the tests via the badge below. If the tests fail, the badge will be red.

![Tests](https://github.com/Karitchi/infolab/actions/workflows/test.yml/badge.svg)

### Create Your Integration Tests or Others

To create your own tests, you can use `database.test.js` for tests that require a copy of our database.

For any other test, you are free to write your tests in CommonJS (no imports, but `require`), and simply add a file `XXX.test.js` in the /test/integration section (those new added tests would automatically be tested by jest in the ci/cd pipeline on each push or pull).

### Run Tests Locally

1. with npm

```bash
npm run test
```

2. with docker

```bash
docker compose -f docker-compose.test.yml run --rm test
```
