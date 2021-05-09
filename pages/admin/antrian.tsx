/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Antrian = () => {
  const router = useRouter();
  const [max, setMax] = useState('');
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [listAntrian, setListAntrian] = useState<any>();
  const [maxData, setMaxData] = useState(0);
  const [listTanggal, setListTanggal] = useState<any>();
  const [dateNow, setDateNow] = useState<any>();
  const [statusAntrian, setStatusAntrian] = useState<any>();
  const [token, setToken] = useState('');

  const socket = io();

  useEffect(() => {
    getList();
    setToken(cookieCutter.get('token'));
    socket.on('list_antrian', (data) => {
      setListAntrian(data);
    });
  }, []);

  const getList = async () => {
    try {
      const d = new Date();
      const date = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      let thisDate = '';
      let monthNow = '';
      if (date.toString().length < 2) {
        thisDate = `0${date.toString()}`;
      }
      if (month.toString().length < 2) {
        monthNow = `0${month.toString()}`;
      }
      const nowDate = `${year}-${monthNow}-${thisDate}`;
      setDateNow(nowDate);
      const getListAntrian = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const maximum = getListAntrian.data.length;
      setMaxData(maximum);
      const antri = getListAntrian.data
        .filter((x: any) => x.nomor !== 0)
        .sort((a: any, b: any) => (a.nomor > b.nomor ? 1 : -1));
      setListAntrian(antri);
      const max_antri = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      if (max_antri.data.length > 0) {
        setStatus(true);
      }
      socket.emit('max_antrian', max_antri.data.length);
      const dataAntrian = await axios({
        method: 'get',
        url: '/api/antri',
      });
      let dataTanggal: any[] = [];
      for (let i = 0; i < dataAntrian.data.length; i++) {
        dataTanggal.push(dataAntrian.data[i].time);
      }
      const mySet: any = new Set<any>(
        dataTanggal.sort((a: any, b: any) => (a.nomor > b.nomor ? 1 : -1))
      );
      dataTanggal = [...mySet];
      setListTanggal(dataTanggal);
      const getStatus = await axios({
        method: 'GET',
        url: '/api/aplikasi',
      });
      const antrianStatus = getStatus.data.filter(
        (x: any) => x.keys === 'status'
      );
      setStatusAntrian(antrianStatus[0].values);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(e.target.value);
  };

  const onDateChange = async (e: any) => {
    const { value } = e.target;
    const getListAntrian = await axios({
      method: 'post',
      url: '/api/daftar',
    });
    const antri = getListAntrian.data
      .filter((x: any) => x.nomor !== 0 && x.time === value)
      .sort((a: any, b: any) => (a.nomor > b.nomor ? 1 : -1));
    setListAntrian(antri);
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatusAntrian(value);
  };

  const handleMax = (e: any) => {
    e.preventDefault();
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let thisDate = '';
    let monthNow = '';
    if (date.toString().length < 2) {
      thisDate = `0${date.toString()}`;
    }
    if (month.toString().length < 2) {
      monthNow = `0${month.toString()}`;
    }
    const nowDate = `${year}-${monthNow}-${thisDate}`;
    const data = {
      operator: 0,
      nomor: 0,
      kode: '',
      time: nowDate,
      nopol: '',
      jarak: '',
      stat_book: '',
      member: '',
      antrian: 'created',
    };
    const prom: any = [];
    const promises = [];
    for (let i = 0; i < Number(max); i++) {
      promises.push(
        axios.post('/api/antri', data).then((response) => {
          prom.push(response);
        })
      );
    }
    Promise.all(promises).then(() => {
      setSuccess(true);
      socket.emit('max_antrian', max);
      router.push('/admin');
    });
  };

  const handleStatus = async () => {
    try {
      const changeStatus = await axios({
        method: 'PUT',
        url: '/api/aplikasi',
        data: {
          keys: 'status',
          values: statusAntrian,
        },
        headers: { token },
      });
      const getStatus = await axios({
        method: 'GET',
        url: '/api/aplikasi',
      });
      const antrianStatus = getStatus.data.filter(
        (x: any) => x.keys === 'status'
      );
      console.log(antrianStatus[0].values);
      socket.emit('status_antrian', antrianStatus[0].values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaSeo title="Dashboard" description="Admin User Antrian" />
      <LayoutDashboard>
        <div className="flex justify-center items-center m-0 p-0 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Antrian
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        <div className="card rounded-3xl mb-6">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="maxqueue" className="block font-bold mb-4">
              Batas Maksimal Antrian
            </label>
            <div className="mt-4 space-y-4">
              <input
                type="number"
                name="maxqueue"
                id="maxqueue"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={onFormChange}
              />
            </div>
            {success && (
              <p className="text-right text-green-500">
                Sukses membuat antrian
              </p>
            )}
            {status && (
              <p className="text-right text-green-500">{`Jumlah antrian yang sudah dibuat ${maxData}`}</p>
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
            <button
              type="submit"
              className={status ? 'btn btn-warning' : 'btn btn-primary'}
              // disabled={status}
              onClick={handleMax}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 -mt-1 mr-1 inline-flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {status ? 'Tambah' : 'Simpan'}
            </button>
          </div>
        </div>

        <div className="card rounded-3xl mb-6">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <div className="font-bold mb-4">Status Sistem Antrian</div>
            <div className="flex mt-4">
              <div className="flex items-center mr-6">
                <input
                  id="statusAntrian"
                  name="statusAntrian"
                  type="radio"
                  value="buka"
                  checked={statusAntrian === 'buka'}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  onChange={onStatusChange}
                />
                <label
                  htmlFor="statusAntrian"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Buka
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="statusAntrian"
                  name="statusAntrian"
                  type="radio"
                  value="tutup"
                  checked={statusAntrian === 'tutup'}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  onChange={onStatusChange}
                />
                <label
                  htmlFor="radioButton"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Tutup
                </label>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={handleStatus}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 -mt-1 mr-1 inline-flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Simpan
            </button>
          </div>
        </div>

        {listTanggal && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden card rounded-2xl">
                  <div className="flex col-span-6 sm:col-span-3 h-10 my-6 items-center">
                    <label
                      htmlFor="tanggalAntrian"
                      className="mx-6 justify-center"
                    >
                      Tanggal
                    </label>
                    <select
                      id="tanggalAntrian"
                      name="tanggalAntrian"
                      className="mt-1 block mx-6 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={onDateChange}
                    >
                      {/* <option value={dateNow}>{dateNow}</option> */}
                      {listTanggal &&
                        listTanggal.map((itemTanggal: any, idx: any) => {
                          return (
                            <option key={itemTanggal} value={itemTanggal}>
                              {itemTanggal}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          No Antrian
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          No Polisi
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          Jarak tempuh (KM)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          Booking / Belum
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          Member
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listAntrian &&
                        listAntrian.map((item: any) => {
                          return (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.kode}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.nopol}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.jarak}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.stat_book}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.member}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.antrian === 'done' ? 'selesai' : '-'}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </LayoutDashboard>
    </>
  );
};

export default Antrian;
