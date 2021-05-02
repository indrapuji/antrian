/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import Modal from 'components/Modal';
import TitleColor from 'components/TitleColor';
import cookieCutter from 'cookie-cutter';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [editRunning, setEditRunning] = useState('');
  // const [editLogo, setEditLogo] = useState('');
  const [EditNama, setEditNama] = useState('');
  const [updateApp, setUpdateApp] = useState('');

  const token = cookieCutter.get('token');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'GET',
      url: '/api/aplikasi',
    })
      .then((res) => {
        const runningBanner = res.data.filter((x: any) => x.keys === 'running');
        if (runningBanner.length > 0) {
          setEditRunning(runningBanner[0].values);
          console.log(runningBanner[0].values);
        }
        // const aplikasiLogo = res.data.filter((x: any) => x.keys === 'logo');
        // if (aplikasiLogo.length > 0) {
        //   setLogoAplikasi(aplikasiLogo[0].values);
        // }
        const aplikasiNama = res.data.filter((x: any) => x.keys === 'nama');
        if (aplikasiNama.length > 0) {
          setEditNama(aplikasiNama[0].values);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNama(e.target.value);
  };
  const changeRunning = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRunning(e.target.value);
  };

  const validate = (namaUpdate: any) => {
    setIsDelete(true);
    setUpdateApp(namaUpdate);
  };

  const updateName = () => {
    axios({
      method: 'PUT',
      url: '/api/aplikasi',
      data: {
        keys: 'nama',
        values: EditNama,
      },
      headers: { token },
    })
      .then((res) => {
        if (res.status === 200) {
          const socket = io();
          socket.emit('nama_aplikasi', EditNama);
        }
        console.log(res);
        getData();
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRunningText = () => {
    axios({
      method: 'PUT',
      url: '/api/aplikasi',
      data: {
        keys: 'running',
        values: editRunning,
      },
      headers: { token },
    })
      .then((res) => {
        if (res.status === 200) {
          const socket = io();
          socket.emit('running_text', editRunning);
        }
        console.log(res);
        getData();
        setIsDelete(false);
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
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Pengaturan dan Informasi
          </TitleColor>
        </div>

        <div className="card rounded-3xl p-4">
          <div className="font-bold text-xl text-teal-600 mb-4">
            Pengaturan aplikasi
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4">
            <div className="col-span-1 sm:col-span-2 xl:col-span-2">
              <div className="relative w-40 h-40 sm:w-36 sm:h-36 md:w-28 md:h-28 xl:w-36 xl:h-36 mx-auto">
                <Image src="/images/daihatsu.png" alt="" layout="fill" />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-6 xl:col-span-10">
              <div className="mb-4">
                <div className="font-bold text-teal-600">Nama Aplikasi</div>
                <p className="m-0 p-0">
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      value={EditNama}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={changeName}
                    />
                  </div>
                </p>
              </div>
              <Link href="/admin/pengaturan">
                <button
                  type="submit"
                  className="btn btn-success float-right"
                  onClick={() => validate('nama')}
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
              </Link>
            </div>
          </div>
        </div>
        <div className="card rounded-3xl p-4 mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className="mb-4">
                <div className="font-bold text-teal-600">
                  Pengumuman teks berjalan
                </div>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="runningText"
                    id="runningText"
                    value={editRunning}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={changeRunning}
                  />
                </div>
              </div>
              <Link href="/admin/pengaturan">
                <button
                  type="submit"
                  className="btn btn-success float-right"
                  onClick={() => validate('running')}
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
              </Link>
            </div>
          </div>
        </div>
      </LayoutDashboard>
      <Modal
        show={isDelete}
        title="Simpan Perubahan"
        desc={<div>Yakin ingin ubah?</div>}
        btnCloseShow
        btnCloseTitle="Batal"
        btnCloseAction={(val: boolean) => setIsDelete(val)}
        btnProcessShow
        btnProcessTitle="Ya Simpan"
        btnProcessStyle="btn-success"
        btnProcessAction={(e: string) => {
          if (updateApp === 'running') {
            updateRunningText();
          } else {
            updateName();
          }
        }}
      />
    </>
  );
};

export default Dashboard;
