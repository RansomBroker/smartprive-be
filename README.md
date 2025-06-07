# Petunjuk Menjalankan Proyek (Bahasa Indonesia)

## 1. Persiapan Environment

1. Duplikat file `.env.example` menjadi `.env` (jika belum ada, buat file `.env` baru).
2. Isi variabel berikut di file `.env` Anda:

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
DIRECT_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

Ganti `<username>`, `<password>`, `<host>`, `<port>`, dan `<database>` sesuai dengan konfigurasi database Supabase Anda.

## 2. Install Dependency

```bash
npm install
```

## 3. Jalankan Migrasi Database

```bash
npx prisma migrate deploy
```

Atau untuk development:

```bash
npx prisma migrate dev
```

## 4. Jalankan Seeder (Menambah User Admin)

```bash
npm run seed
```

## 5. (Opsional) Reset Data

Untuk menghapus seluruh data di database:

```bash
npm run reset
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
# install everything
npm install
# run
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
