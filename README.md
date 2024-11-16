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

Les tests sont automatiquement exécutés via **GitHub Actions** à chaque push ou création de pull request. Vous pouvez suivre l'état des tests grâce au badge ci-dessous. Si les tests échouent, le badge sera rouge.

![Tests](https://github.com/Karitchi/infolab/actions/workflows/test.yml/badge.svg)

### Créer vos tests d'intégration ou autres

Pour créer vos propres tests, vous pouvez utiliser `database.test.js` pour les tests qui nécessitent une copie de notre base de données.

Pour tout autre test, vous êtes libre de rédiger vos tests en CommonJS (pas d'import, mais des `require`), et d'ajouter simplement un fichier `XXX.test.js` dans la section /test/integration.

### Exécuter les tests en local

Pour tester localement, exécutez :

```bash
npm run test
