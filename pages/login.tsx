/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import MetaSeo from 'components/MetaSeo';
import cookieCutter from 'cookie-cutter';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const inputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = cookieCutter.get('token');
    const role = cookieCutter.get('role');
    if (token) {
      if (role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push(`/operator`);
      }
    }
  }, []);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setMessageError('Isi semua field');
      if (username === '' || password === '') {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        return;
      }
      const submit = await axios({
        method: 'POST',
        url: '/api/auth',
        data: {
          username,
          password,
        },
      });
      setIsError(false);
      cookieCutter.set('token', submit.data.token);
      cookieCutter.set('nama', submit.data.nama);
      cookieCutter.set('role', submit.data.role);
      if (submit.data.role === 'ADMIN') {
        router.push('/admin');
      } else {
        cookieCutter.set('label', submit.data.label);
        cookieCutter.set('id', submit.data.id);
        router.push(`/operator`);
      }
    } catch (err) {
      const msg = err.response?.data?.error !== undefined ? err.response.data.error : err.response?.statusText;
      setIsError(true);
      setMessageError(msg);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <>
      <MetaSeo title="Masuk" description="Masuk untuk mengelola antrian" />
      <div className="min-h-screen min-w-screen flex flex-col justify-center">
        <div className="hidden lg:block lg:w-screen lg:h-screen lg:fixed lg:z-10">
          <Image alt="Mountains" src="/images/login-wallpaper.jpeg" layout="fill" objectFit="cover" quality={80} />
        </div>
        <div className="hidden lg:block lg:w-screen lg:h-screen lg:fixed lg:z-20 lg:bg-gradient-to-r lg:from-transparent lg:to-light-blue-500" />
        <div className="p-5 mx-auto static xs:p-0 md:p-10 lg:max-w-lg lg:fixed lg:z-30 lg:right-0 lg:mr-16">
          <div className="bg-white dark:bg-cool-gray-800 text-cool-gray-600 dark:text-cool-gray-400 shadow w-full rounded-xl divide-y divide-cool-gray-200 dark:divide-cool-gray-900 md:shadow-xl">
            <div className="p-5 md:p-8">
              <form action="" method="post" onSubmit={(e) => onFormSubmit(e)}>
                <p className="">Masuk dengan akun Anda, sebagai administrator atau operator.</p>
                <p className="text-xl font-bold mt-0 pt-0">Selamat datang kembali</p>
                {isError && <p className="mb-2 text-red-600 font-semibold">{messageError}</p>}
                <div className="rounded-lg shadow -space-y-px mb-4">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-500 focus:border-light-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      onChange={inputUsername}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Kata sandi
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-indigo-500 focus:border-light-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Kata sandi"
                      onChange={inputPassword}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  <span className="inline-block mr-2">Masuk</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="px-2 py-5 text-center md:px-3 md:py-6 bg-cool-gray-50 rounded-b-xl">
              <Link href="/">
                <a className="mr-4 hover:text-lightBlue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="inline-block ml-1">Kembali ke halaman utama</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
