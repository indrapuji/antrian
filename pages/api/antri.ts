/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextApiRequest, NextApiResponse } from 'next';
// import checktoken from 'utils/checktoken';
import prisma from 'utils/prisma';

const getAllData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allData = await prisma.antrian.findMany();
    return res.status(200).json(allData);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const addAntri = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      operator,
      nomor,
      kode,
      time,
      nopol,
      jarak,
      stat_book,
      member,
      antrian,
    } = req.body;
    const addData = await prisma.antrian.create({
      data: {
        operator,
        nomor,
        kode,
        time,
        nopol,
        jarak,
        stat_book,
        member,
        antrian,
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

const antri = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getAllData(req, res);

    case 'POST':
      return addAntri(req, res);

    case 'PUT':
      return res.status(404).json({ message: 'API belum didefinisikan' });

    case 'DELETE':
      return res.status(404).json({ message: 'API belum didefinisikan' });
    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default antri;
