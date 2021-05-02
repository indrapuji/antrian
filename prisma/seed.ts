import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(10);
const userData = {
  username: `admin`,
  alias: 'Administrator',
  password: bcrypt.hashSync(process.env.PASSWORD_ADMIN, salt),
  role: 'ADMIN',
};

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: userData,
    create: userData,
  });

  // console.log({ admin });
}

main()
  .catch((e) => {
    // console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
