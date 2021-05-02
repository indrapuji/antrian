/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allUser = await prisma.user.findMany();
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, role, alias, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const existData = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existData) {
      throw new Error('Username sudah ada');
    }
    await prisma.user.create({
      data: {
        username,
        role,
        alias,
        password: bcrypt.hashSync(password, salt),
      },
    });
    return res.status(201).json({
      message: 'Berhasil ditambahkan',
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    const existData = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existData) {
      throw new Error(`Username tidak ada`);
    }
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      message: 'User berhasil di delete',
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const user = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getAll(req, res);

    case 'POST':
      return addUser(req, res);

    case 'PUT':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'DELETE':
      return deleteUser(req, res);
    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default user;
