/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [textRunning, setTextRunning] = useState('');
  const [logoAplikasi, setLogoAplikasi] = useState('');
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const [countOperator, setCountOperator] = useState(0);
  const [maxAntrian, setMaxAntrian] = useState(0);

  useEffect(() => {
    getData();
    countUser();
    getList();
  }, []);

  const getList = () => {
    axios({
      method: 'get',
      url: '/api/daftar',
    })
      .then((res) => {
        if (res.data.length > 0) {
          setMaxAntrian(res.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const socket = io();

  socket.on('running_text', (data) => {
    setTextRunning(data);
  });

  socket.on('nama_aplikasi', (data) => {
    setNamaAplikasi(data);
  });

  socket.on('max_antrian', (data) => {
    setMaxAntrian(data);
  });

  const getData = async () => {
    try {
      const aplikasi = await axios({
        method: 'GET',
        url: '/api/aplikasi',
      });
      const aplikasiLogo = aplikasi.data.filter((x: any) => x.keys === 'logo');
      if (aplikasiLogo.length > 0) {
        setLogoAplikasi(aplikasiLogo[0].values);
      }
      const aplikasiNama = aplikasi.data.filter((x: any) => x.keys === 'nama');
      if (aplikasiNama.length > 0) {
        setNamaAplikasi(aplikasiNama[0].values);
      }
      const runningBanner = aplikasi.data.filter(
        (x: any) => x.keys === 'running'
      );
      if (runningBanner.length > 0) {
        setTextRunning(runningBanner[0].values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const countUser = () => {
    axios({
      method: 'GET',
      url: '/api/user',
    })
      .then((res) => {
        const operatorCount = res.data.filter(
          (x: any) => x.role === 'OPERATOR'
        );
        setCountOperator(operatorCount.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <MetaSeo title="Dashboard" description="Admin Dashboard Antrian" />
      <LayoutDashboard>
        <div className="inline-flex justify-center items-center m-0 p-0 mb-4">
          <svg
            className="w-6 h-6 -mt-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Dashboard
          </TitleColor>
        </div>

        <div className="w-full mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card rounded-3xl">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-500 uppercase font-bold text-sm">
                      Operator
                    </h5>
                    <TitleColor className="text-2xl" color="bg-secondary">
                      {`${countOperator} orang`}
                    </TitleColor>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-cyan-500 m-0 mt-2 -mb-2 p-0">
                  <Link href="/admin/user">
                    <button
                      type="button"
                      className="focus:outline-none tooltip inline-flex"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 mt-1 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-bold mt-1">Kelola Operator</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>

            <div className="card rounded-3xl">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-500 uppercase font-bold text-sm">
                      Batas Antrian
                    </h5>
                    <TitleColor className="text-2xl" color="bg-warning">
                      {`${maxAntrian} nomor`}
                    </TitleColor>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-orange-500 m-0 mt-2 -mb-2 p-0">
                  <Link href="/admin/antrian">
                    <button
                      type="button"
                      className="focus:outline-none tooltip inline-flex"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 mt-1 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-bold mt-1">
                        Kelola Batas Antrian
                      </span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>

            <div className="card rounded-3xl">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-500 uppercase font-bold text-sm">
                      Status Antrian
                    </h5>
                    <TitleColor className="text-2xl" color="bg-danger">
                      {maxAntrian > 0 ? 'Dibuka' : 'Ditutup'}
                    </TitleColor>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-rose-500 m-0 mt-2 -mb-2 p-0">
                  <Link href="/admin/antrian">
                    <button
                      type="button"
                      className="focus:outline-none tooltip inline-flex"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 mt-1 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-bold mt-1">Tutup Antrian</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card rounded-3xl p-4">
          <div className="font-bold text-xl text-teal-600 mb-4">
            Informasi aplikasi
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4">
            <div className="col-span-1 sm:col-span-2 xl:col-span-2">
              <div className="relative w-40 h-40 sm:w-36 sm:h-36 md:w-28 md:h-28 xl:w-36 xl:h-36 mx-auto">
                <Image
                  src={`/images/${logoAplikasi}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-6 xl:col-span-10">
              <div className="mb-4">
                <div className="font-bold text-teal-600">Nama Aplikasi</div>
                <p className="m-0 p-0">
                  <TitleColor className="text-xl" color="bg-dark">
                    {namaAplikasi}
                  </TitleColor>
                </p>
              </div>
              <div className="mb-4">
                <div className="font-bold text-teal-600">
                  Pengumuman teks berjalan
                </div>
                <p className="m-0 p-0">{textRunning}</p>
              </div>
              <Link href="/admin/pengaturan">
                <button
                  type="button"
                  className="focus:outline-none tooltip inline-flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mt-1 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-bold mt-1">Pengaturan aplikasi</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default Dashboard;
