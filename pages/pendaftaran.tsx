/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import Footer from 'components/Footer';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Pendaftaran = () => {
  const [now, updateNow] = useState(moment().locale('id'));
  const [formData, setFormData] = useState({
    nopol: '',
    km: '',
    status: '',
    member: '',
  });

  useEffect(() => {
    setInterval(() => {
      updateNow(moment().locale('id'));
    }, 1000);
  }, []);

  const onFormChange = (e: any) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <MetaSeo title="Masuk" description="Sistem Antrian" />
      <div className="flex">
        <main className="flex-grow flex flex-col min-h-screen w-full">
          <div className="h-full">
            <header className="h-16 flex items-center p-2 shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-cool-gray-100 text-shadow-sm">
              <div className="relative h-8 w-8">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-3xl md:font-bold md:truncate">
                Klinik Sehat
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
                  Pendaftaran Antrian
                </TitleColor>

                <div className="flex flex-grow items-center justify-end">
                  &nbsp;
                </div>
              </div>

              <div className="card rounded-3xl mb-6">
                <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
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
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Pendaftaran;
