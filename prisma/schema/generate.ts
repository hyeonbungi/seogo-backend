import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

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

execSync('npx prisma db push', { stdio: 'inherit' });
