import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient, Review } from '@prisma/client';
import { removeWhitespace } from '@/_common/utils/helpers';
import { seedData } from './data';

const env = process.env.NODE_ENV ?? 'development';

if (env == 'development') {
  dotenv.config({
    path: path.resolve(__dirname, '../../.env.development.local'),
  });
} else if (env === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.test.local') });
} else if (env === 'production') {
  dotenv.config({
    path: path.resolve(__dirname, '../../.env.production.local'),
  });
}

const client = new PrismaClient();

async function truncateAllTables() {
  const tablenames = await client.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await client.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} RESTART IDENTITY;`,
    );
  } catch (error) {
    console.error({ error });
  }
}

async function injectSeedData() {
  const reviews = seedData.reduce((acc: Review[], book, index) => {
    acc.push(
      ...book.reviews.map((review: Review) => ({
        ...review,
        bookId: index + 1,
      })),
    );
    return acc;
  }, [] as Review[]);

  const books = seedData.map((book) => {
    delete book.reviews;

    book['searchIndex'] = removeWhitespace([
      book.title,
      book.subTitle,
      book.author,
    ]);

    return book;
  });

  await client.book.createMany({
    data: books,
  });

  await client.review.createMany({
    data: reviews,
  });
}

async function main() {
  await truncateAllTables();
  await injectSeedData();
}
main();
