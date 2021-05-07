/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Footer from 'components/Footer';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Pendaftaran = () => {
  const [now, updateNow] = useState(moment().locale('id'));
  const [formData, setFormData] = useState({
    nopol: '',
    km: '',
    status: '',
    member: '',
  });
  const [daftar, setDaftar] = useState([]);
  const [count, setCount] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [kodeStatus, setKodeStatus] = useState('');
  const [countBooking, setCountBooking] = useState(0);
  const [countNonBooking, setCountNonBooking] = useState(0);
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const [logoAplikasi, setLogoAplikasi] = useState('');

  useEffect(() => {
    setInterval(() => {
      updateNow(moment().locale('id'));
    }, 1000);
  }, []);

  const socket = io();
  socket.on('nama_aplikasi', (data) => {
    setNamaAplikasi(data);
  });

  socket.on('logo_aplikasi', (data) => {
    setLogoAplikasi(data);
  });

  useEffect(() => {
    getList();
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'GET',
      url: '/api/aplikasi',
    })
      .then((res) => {
        const aplikasiLogo = res.data.filter((x: any) => x.keys === 'logo');
        if (aplikasiLogo.length > 0) {
          setLogoAplikasi(aplikasiLogo[0].values);
          socket.emit('logo_aplikasi', aplikasiLogo[0].values);
        }
        const aplikasiNama = res.data.filter((x: any) => x.keys === 'nama');
        if (aplikasiNama.length > 0) {
          setNamaAplikasi(aplikasiNama[0].values);
          socket.emit('nama_aplikasi', aplikasiNama[0].values);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getList = () => {
    axios({
      method: 'get',
      url: '/api/daftar',
    })
      .then((res) => {
        const filterData = res.data
          .filter((x: any) => x.kode === '')
          .sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        const bookingData = res.data.filter(
          (x: any) => x.stat_book === 'booking'
        );
        const nonBooking = res.data.filter((x: any) => x.stat_book === 'non');
        setDaftar(filterData[0].id);
        setCountBooking(bookingData.length + 1);
        setCountNonBooking(nonBooking.length + 1);
        setCount(res.data.length - filterData.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFormChange = (e: any) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { nopol, km, status, member } = formData;
      setMessage('Isi Semua Field');
      if (nopol === '' || km === '' || status === '' || member === '') {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
        }, 3000);
        return;
      }
      let kode = '';
      if (status === 'booking') {
        kode = `B${countBooking}`;
        setKodeStatus(`B${countBooking}`);
      } else {
        kode = `N${countNonBooking}`;
        setKodeStatus(`N${countNonBooking}`);
      }
      const registerNew = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: {
          id: Number(daftar),
          nopol,
          km,
          status,
          member,
          antrian: 'waiting',
          kode,
          nomor: Number(count) + 1,
        },
      });
      const getListAntrian = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antri = getListAntrian.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      socket.emit('pendaftaran', antri);
      const listAntrian = getListAntrian.data
        .filter((x: any) => x.nomor !== 0)
        .sort((a: any, b: any) => (a.nomor > b.nomor ? 1 : -1));
      socket.emit('list_antrian', listAntrian);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handdleRegister = () => {
    setSuccess(false);
    setFormData({ nopol: '', km: '', status: '', member: '' });
    getList();
  };
  return (
    <>
      <MetaSeo title="Pendaftaran" description="Sistem Antrian" />
      <div className="flex">
        <main className="flex-grow flex flex-col min-h-screen w-full">
          <div className="h-full">
            <header className="h-16 flex items-center p-2 shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-cool-gray-100 text-shadow-sm">
              <div className="relative h-8 w-8">
                <Image
                  src={`/images/${logoAplikasi}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-3xl md:font-bold md:truncate">
                <p>{namaAplikasi}</p>
              </div>

              <div className="flex-grow items-center justify-end m-2 font-semibold text-right">
                <div className="m-0 p-0">
                  {now.format('dddd, Do MMMM YYYY')}
                </div>
                <div className="m-0 p-0">pukul {now.format('hh:mm a')}</div>
              </div>
            </header>
            <div className="justify-center items-center m-6">
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
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
                  {success ? 'Nomor Antrian' : 'Pendaftaran Antrian'}
                </TitleColor>

                <div className="flex flex-grow items-center justify-end">
                  &nbsp;
                </div>
              </div>

              {!success ? (
                <div className="card rounded-3xl mb-6">
                  <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
                    {wrong && (
                      <p className="text-red-600 font-bold">{message}</p>
                    )}
                    <label htmlFor="nopol" className="block font-bold mb-4">
                      Nomor Polisi
                    </label>
                    <div className="mt-4 space-y-4">
                      <input
                        type="text"
                        name="nopol"
                        id="nopol"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={onFormChange}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
                    <label htmlFor="km" className="block font-bold mb-4">
                      Jarak tempuh (KM)
                    </label>
                    <div className="mt-4 space-y-4">
                      <input
                        type="text"
                        name="km"
                        id="km"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={onFormChange}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
                    <label htmlFor="status" className="block font-bold mb-4">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      autoComplete="status"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={onFormChange}
                    >
                      <option value="0">Silahkan Pilih</option>
                      <option value="booking">Booking</option>
                      <option value="non">Non Booking</option>
                    </select>
                  </div>
                  <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
                    <label htmlFor="maxqueue" className="block font-bold mb-4">
                      Member
                    </label>
                    <select
                      id="member"
                      name="member"
                      autoComplete="member"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={onFormChange}
                    >
                      <option value="0">Silahkan Pilih</option>
                      <option value="yes">Sudah Pernah</option>
                      <option value="no">Baru Pertama</option>
                    </select>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={submitForm}
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
                      Daftar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card rounded-3xl mb-6">
                    <div className="px-4 py-5 bg-white rounded-3xl sm:p-10">
                      <h1 className="text-center font-extrabold text-9xl align-middle">
                        {kodeStatus}
                      </h1>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onClick={handdleRegister}
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
                    Daftar baru
                  </button>
                </>
              )}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Pendaftaran;
