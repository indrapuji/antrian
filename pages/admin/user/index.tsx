/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */

import axios from 'axios';
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import Modal from 'components/Modal';
import TitleColor from 'components/TitleColor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const User = () => {
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [userData, setUserData] = useState({
    id: '',
    username: '',
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
      method: 'GET',
      url: '/api/user',
    })
      .then((res) => {
        const userList = res.data.sort((a: any, b: any) =>
          a.label > b.label ? 1 : -1
        );
        setListUser(userList);
        const filterOperator = res.data.filter((x: any) => x.role !== 'ADMIN');
        const socket = io();
        socket.emit('operator', filterOperator);
        console.log(filterOperator);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidate = (userId: any, nameUser: any) => {
    setUserData({ id: userId, username: nameUser });
    setIsDelete(true);
  };

  const handleEdit = (userId: any) => {
    router.push(`/admin/user/${userId}`);
  };

  const handleDelete = () => {
    axios({
      method: 'DELETE',
      url: '/api/user',
      data: {
        id: userData.id,
      },
    })
      .then((res) => {
        setIsDelete(false);
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <MetaSeo title="Admin User" description="Admin User Antrian" />
      <LayoutDashboard>
        <div className="flex justify-center items-center m-0 p-0 mb-4">
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            User
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">
            <Link href="/admin/user/tambah">
              <button type="button" className="btn btn-primary">
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Tambah User
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden card rounded-2xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                      >
                        Label
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                      />
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listUser &&
                      listUser.map((item: any) => {
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.nama}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.label}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <a
                                className="text-indigo-600 hover:text-indigo-900 font-semibold cursor-pointer"
                                onClick={() => handleEdit(item.id)}
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
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                Ubah
                              </a>
                              <span className="mx-4">|</span>
                              <a
                                href="#"
                                className="text-rose-600 hover:text-rose-900 font-semibold"
                                onClick={() =>
                                  handleValidate(item.id, item.username)
                                }
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Hapus
                              </a>
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
      </LayoutDashboard>

      <Modal
        show={isDelete}
        title="Hapus User"
        desc={
          <div>
            Yakin ingin menghapus meisitalomania?
            <br />
            Data akan dihapus permanen dan tidak bisa dikembalikan.
          </div>
        }
        btnCloseShow
        btnCloseTitle="Batal"
        btnCloseAction={(val: boolean) => setIsDelete(val)}
        btnProcessShow
        btnProcessTitle="Ya hapus"
        btnProcessStyle="btn-danger"
        btnProcessAction={() => {
          handleDelete();
        }}
      />
    </>
  );
};

export default User;
