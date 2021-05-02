/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

const getName = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allData = await prisma.aplikasi.findMany();
    return res.status(200).json(allData);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const aplikasi = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getName(req, res);

    case 'POST':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'PUT':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'DELETE':
      return res.status(404).json({ message: 'API belum didefinisikan' });
    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default aplikasi;
