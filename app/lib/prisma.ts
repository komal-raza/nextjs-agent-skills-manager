import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Node's default 250ms per-address attempt is too short for high-latency
  // links (e.g. Neon us-east-2), causing instant ETIMEDOUT.
  setDefaultAutoSelectFamilyAttemptTimeout(5000);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis:10000
   });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}