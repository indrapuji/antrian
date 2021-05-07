/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const TambahUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    nama: '',
    role: '',
    password: '',
    label: '',
  });
  const [repeat, setRepeat] = useState('');
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState('');

  const onFormChange = (e: any) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onRepeatChange = (e: any) => {
    setRepeat(e.target.value);
  };
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const { username, role, nama, label } = formData;
    if (username === '' || role === '' || nama === '' || label === '') {
      setMessage('Isi semua field');
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 3000);
      return;
    }
    if (formData.password !== repeat) {
      setMessage('Password tidak sama');
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 3000);
    } else {
      setWrong(false);
      axios({
        method: 'POST',
        url: '/api/user',
        data: formData,
      })
        .then((res) => {
          console.log(res);
          router.push('/admin/user');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBack = () => {
    router.push('/admin/user');
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
            className="w-6 h-6 -mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            User | Tambah Baru
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden card rounded-2xl">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid-cols-6 gap-6">
                          {wrong && (
                            <p className="text-red-600 font-bold">{message}</p>
                          )}
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="username" className="block">
                              Username
                            </label>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="given-name"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={onFormChange}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="nama" className="block">
                              Nama
                            </label>
                            <input
                              type="text"
                              name="nama"
                              id="nama"
                              autoComplete="given-name"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={onFormChange}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="role" className="block">
                              Role
                            </label>
                            <select
                              id="role"
                              name="role"
                              autoComplete="role"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              onChange={onFormChange}
                            >
                              <option value="0">Silahkan Pilih</option>
                              <option value="OPERATOR">Operator</option>
                              <option value="ADMIN">Administrator</option>
                            </select>
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="label" className="block">
                              Label
                            </label>
                            <input
                              type="text"
                              name="label"
                              id="label"
                              placeholder="Operator 1 / Konsultan 1 / Counter 1 etc...."
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={onFormChange}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4 m-0 p-0" />

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="password" className="block">
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              required
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={onFormChange}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="retype_password" className="block">
                              Konfirmasi Password
                            </label>
                            <input
                              type="password"
                              name="retype_password"
                              id="retype_password"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={onRepeatChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="button"
                          className="btn btn-warning mr-4"
                          onClick={() => handleBack()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 -mt-1 inline-flex"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={onFormSubmit}
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
                          Tambah
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default TambahUser;
