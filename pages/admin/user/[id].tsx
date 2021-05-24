/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const UbahUser = () => {
  const router = useRouter();
  const userId = router.query.id;
  const [dataUser, setDataUser] = useState<any>();
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(cookieCutter.get('token'));
    getUser(userId);
  }, [userId]);

  const getUser = async (id: any) => {
    try {
      const userData = await axios({
        method: 'GET',
        url: '/api/user',
      });
      const singleUser = userData.data.filter((x: any) => x.id === Number(id));
      setDataUser(singleUser[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (e: any) => {
    const { value, name } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const { username, nama, label } = dataUser;
    setMessage('Isi semua field');
    if (username === '' || nama === '' || label === '') {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 3000);
    } else {
      setWrong(false);
      axios({
        method: 'PUT',
        url: '/api/user',
        data: dataUser,
        headers: { token },
      })
        .then((res) => {
          const socket = io();
          socket.emit('operator', res);
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
      <MetaSeo title="Edit User" description="Admin User Antrian" />
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
          {dataUser && (
            <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
              {`User | ${dataUser.nama}`}
            </TitleColor>
          )}

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        {dataUser && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden card rounded-2xl">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form method="POST">
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid-cols-6 gap-6">
                            {wrong && (
                              <p className="text-red-600 font-bold">
                                {message}
                              </p>
                            )}
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="username" className="block">
                                Username
                              </label>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={dataUser.username}
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
                                value={dataUser.nama}
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
                                disabled
                                autoComplete="role"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="0">{dataUser.role}</option>
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
                                value={dataUser.label}
                                placeholder="Operator 1 / Konsultan 1 / Counter 1 etc...."
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                                onChange={onFormChange}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-4 m-0 p-0" />
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
                            Simpan
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </LayoutDashboard>
    </>
  );
};

export default UbahUser;
