/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next';
import checktoken from 'utils/checktoken';
import prisma from 'utils/prisma';

const getAllData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allData = await prisma.setting.findMany();
    return res.status(200).json(allData);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const UpdateData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers;
    const verifyData = checktoken(token);
    if (!verifyData) throw new Error('Unauthorized');
    const { keys, values } = req.body;
    const dataUpdate = await prisma.setting.update({
      where: {
        keys,
      },
      data: {
        values,
      },
    });
    if (!dataUpdate) {
      throw new Error(`Data tidak ada`);
    }
    return res.status(200).json({
      message: 'Data berhasil di update',
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const aplikasi = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getAllData(req, res);

    case 'POST':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'PUT':
      return UpdateData(req, res);

    case 'DELETE':
      return res.status(404).json({ message: 'API belum didefinisikan' });
    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default aplikasi;
