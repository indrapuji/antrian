/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(10);
const userData = {
  username: `admin`,
  nama: 'Administrator',
  password: bcrypt.hashSync(process.env.PASSWORD_ADMIN, salt),
  role: 'ADMIN',
  label: 'Administrator',
};

const aplikasiNama = {
  keys: 'nama',
  values: 'Antrian Daihatsu',
};

const textRunning = {
  keys: 'running',
  values:
    'Ini adalah running text yang ada di antrian untuk menyampaikan informasi / pengumuman yang sedang antri',
};

const aplikasiLogo = {
  keys: 'logo',
  values: 'daihatsu.png',
};

const aplikasiStatus = {
  keys: 'status',
  values: 'buka',
};

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: userData,
    create: userData,
  });

  const namaAplikasi = await prisma.setting.upsert({
    where: { keys: 'nama' },
    update: aplikasiNama,
    create: aplikasiNama,
  });

  const runningText = await prisma.setting.upsert({
    where: { keys: 'running' },
    update: textRunning,
    create: textRunning,
  });

  const logoAplikasi = await prisma.setting.upsert({
    where: { keys: 'logo' },
    update: aplikasiLogo,
    create: aplikasiLogo,
  });

  const statusAplikasi = await prisma.setting.upsert({
    where: { keys: 'status' },
    update: aplikasiStatus,
    create: aplikasiStatus,
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
