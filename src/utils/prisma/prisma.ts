import { PrismaClient } from "@prisma/client";

console.log(PrismaClient);

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });
console.log(prisma);
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
console.log(prisma);

export default prisma;
