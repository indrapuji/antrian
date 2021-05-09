/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      throw new Error('Silahkan input Username / Password');
    if (!username && !password)
      throw new Error('Silahkan input Username & Password');
    const searchUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!searchUser) throw new Error('User tidak terdaftar');
    if (searchUser.password === null)
      throw new Error('Username & Password salah');
    const comparePass = bcrypt.compareSync(password, searchUser.password);
    if (!comparePass) throw new Error('Username & Password salah');
    const secret = process.env.TOKEN_SECRET || '';
    const token = sign(
      {
        id: searchUser.id,
        username: searchUser.username,
        role: searchUser.role,
      },
      secret
    );
    return res.status(200).json({
      message: 'login berhasil',
      token,
      nama: searchUser.nama,
      role: searchUser.role,
      id: searchUser.id,
      label: searchUser.label,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Login gagal',
      error: error.message,
    });
  }
};

const auth = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'POST':
      return handlePost(req, res);

    case 'PUT':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'DELETE':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default auth;
