/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next';
import checktoken from 'utils/checktoken';
import prisma from 'utils/prisma';

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let dateNow = '';
    let monthNow = '';
    if (date.toString().length < 2) {
      dateNow = `0${date.toString()}`;
    } else {
      dateNow = date.toString();
    }
    if (month.toString().length < 2) {
      monthNow = `0${month.toString()}`;
    } else {
      monthNow = month.toString();
    }
    const nowDate = `${year}-${monthNow}-${dateNow}`;
    const allData = await prisma.antrian.findMany({
      where: {
        time: nowDate,
      },
    });
    return res.status(200).json(allData);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const getDataDate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { time } = req.body;
    const allData = await prisma.antrian.findMany({
      where: {
        time,
      },
    });
    return res.status(200).json(allData);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const UpdateData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, nopol, km, status, member, antrian, kode, nomor, operator } =
      req.body;
    const dataUpdate = await prisma.antrian.update({
      where: {
        id,
      },
      data: {
        nopol,
        jarak: km,
        stat_book: status,
        member,
        antrian,
        kode,
        nomor,
        operator,
      },
    });
    if (!dataUpdate) {
      throw new Error(`Data tidak ada`);
    }
    return res.status(200).json(dataUpdate);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const antri = (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getData(req, res);

    case 'POST':
      return getDataDate(req, res);

    case 'PUT':
      return UpdateData(req, res);

    case 'DELETE':
      return res.status(404).json({ message: 'API belum didefinisikan' });
    default:
      return res.status(404).json({ message: 'API belum didefinisikan' });
  }
};
export default antri;
