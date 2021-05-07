/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { data } from 'autoprefixer';
import axios from 'axios';
import Footer from 'components/Footer';
import MetaSeo from 'components/MetaSeo';
import Modal from 'components/Modal';
import TitleColor from 'components/TitleColor';
import cookieCutter from 'cookie-cutter';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Pendaftaran = () => {
  const router = useRouter();
  const [now, updateNow] = useState(moment().locale('id'));
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const [logoAplikasi, setLogoAplikasi] = useState('');
  const [panggil, setPanggil] = useState('');
  // const [mulai, setMulai] = useState<any>();
  const [newId, setNewId] = useState();
  const [current, setCurrent] = useState<any>();
  const [operator, setOperator] = useState('');
  const [skipAntrian, setSkipAntrian] = useState<any>();
  const [isShow, setIsShow] = useState(false);
  const [skipId, setSkipId] = useState();
  const [doneAntrian, setDoneAntrian] = useState<any>();

  useEffect(() => {
    // setInterval(() => {
    updateNow(moment().locale('id'));
    // }, 1000);
  }, []);

  const socket = io();
  useEffect(() => {
    setOperator(cookieCutter.get('label'));
    getAntrian();
    setNewId(cookieCutter.get('id'));
    const id = cookieCutter.get('id');
    if (!id) {
      router.push('/login');
    }

    socket.on('nama_aplikasi', (data) => {
      setNamaAplikasi(data);
    });

    socket.on('logo_aplikasi', (data) => {
      setLogoAplikasi(data);
    });

    socket.on('panggilan', (data) => {
      if (data.operator === Number(id)) {
        setPanggil(data.kode);
        // console.log(data);
      }
    });
    getData();
  }, []);

  const antriData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    cookieCutter.set('token', '', { expires: new Date(0) });
    cookieCutter.set('nama', '', { expires: new Date(0) });
    cookieCutter.set('role', '', { expires: new Date(0) });
    cookieCutter.set('id', '', { expires: new Date(0) });
    router.push('/login');
  };

  const getData = () => {
    axios({
      method: 'GET',
      url: '/api/aplikasi',
    })
      .then((res) => {
        const aplikasiLogo = res.data.filter((x: any) => x.keys === 'logo');
        if (aplikasiLogo.length > 0) {
          setLogoAplikasi(aplikasiLogo[0].values);
        }
        const aplikasiNama = res.data.filter((x: any) => x.keys === 'nama');
        if (aplikasiNama.length > 0) {
          setNamaAplikasi(aplikasiNama[0].values);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAntrian = async () => {
    try {
      const id = cookieCutter.get('id');
      const current = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const panggilanSekarang = current.data
        .filter(
          (x: any) => x.antrian === 'calling' && x.operator === Number(id)
        )
        .sort((a: any, b: any) => (a.nomor > b.nomor ? 1 : -1));
      if (panggilanSekarang[panggilanSekarang.length - 1].kode !== undefined) {
        setPanggil(panggilanSekarang[panggilanSekarang.length - 1].kode);
        setCurrent({
          ...panggilanSekarang[panggilanSekarang.length - 1],
          label: cookieCutter.get('label'),
        });
      }
      const antrianDone = current.data.filter(
        (x: any) => x.antrian === 'done' && x.operator === Number(id)
      );
      setDoneAntrian(antrianDone);
      const antrianSkip = current.data.filter(
        (x: any) => x.antrian === 'skip' && x.operator === Number(id)
      );
      setSkipAntrian(antrianSkip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMulai = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setCurrent({ label: cookieCutter.get('label') });
    try {
      const getNew = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const startAntri = getNew.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      const newAntri = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: {
          id: startAntri[0].id,
          operator: Number(newId),
          antrian: 'calling',
        },
      });
      socket.emit('panggilan', {
        ...newAntri.data,
        label: cookieCutter.get('label'),
      });
      setCurrent({ ...newAntri.data, label: cookieCutter.get('label') });
      const getListAntrian = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antri = getListAntrian.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      socket.emit('pendaftaran', antri);
    } catch (error) {
      console.log(error);
    }
  };

  const handdlePanggilan = () => {
    socket.emit('panggilan', current);
  };

  const handleNext = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const id = cookieCutter.get('id');
      const validate = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: current.id, antrian: 'done' },
      });
      const getNew = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const startAntri = getNew.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      const newAntri = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: {
          id: startAntri[0].id,
          operator: Number(newId),
          antrian: 'calling',
        },
      });
      socket.emit('panggilan', {
        ...newAntri.data,
        label: cookieCutter.get('label'),
      });
      setCurrent({ ...newAntri.data, label: cookieCutter.get('label') });
      const getListAntrian = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antri = getListAntrian.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      socket.emit('pendaftaran', antri);
      const antrianDone = getListAntrian.data.filter(
        (x: any) => x.antrian === 'done' && x.operator === Number(id)
      );
      setDoneAntrian(antrianDone);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const validate = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: current.id, antrian: 'skip' },
      });
      const getNew = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const startAntri = getNew.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      const newAntri = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: {
          id: startAntri[0].id,
          operator: Number(newId),
          antrian: 'calling',
        },
      });
      socket.emit('panggilan', {
        ...newAntri.data,
        label: cookieCutter.get('label'),
      });
      setCurrent({ ...newAntri.data, label: cookieCutter.get('label') });
      const getListAntrian = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antri = getListAntrian.data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      socket.emit('pendaftaran', antri);
      const antrianSkip = getListAntrian.data.filter(
        (x: any) => x.antrian === 'skip' && x.operator === Number(newId)
      );
      // console.log(antrianSkip);
      setSkipAntrian(antrianSkip);
    } catch (error) {
      console.log(error);
    }
  };

  const panggilLagi = (idSkip: any) => {
    setSkipId(idSkip);
    setIsShow(true);
  };

  const currentDone = async () => {
    try {
      const id = cookieCutter.get('id');
      setIsShow(false);
      const validate = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: current.id, antrian: 'done' },
      });
      const changeStatus = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: skipId, antrian: 'calling' },
      });
      socket.emit('panggilan', {
        ...changeStatus.data,
        label: cookieCutter.get('label'),
      });
      setCurrent({ ...changeStatus.data, label: cookieCutter.get('label') });
      const getListDone = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antrianDone = getListDone.data.filter(
        (x: any) => x.antrian === 'done' && x.operator === Number(id)
      );
      setDoneAntrian(antrianDone);
      const antrianSkip = getListDone.data.filter(
        (x: any) => x.antrian === 'skip' && x.operator === Number(newId)
      );
      // console.log(antrianSkip);
      setSkipAntrian(antrianSkip);
    } catch (error) {
      console.log(error);
    }
  };

  const currentSkip = async () => {
    try {
      const id = cookieCutter.get('id');
      setIsShow(false);
      const validate = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: current.id, antrian: 'skip' },
      });
      const changeStatus = await axios({
        method: 'PUT',
        url: '/api/daftar',
        data: { id: skipId, antrian: 'calling' },
      });
      socket.emit('panggilan', {
        ...changeStatus.data,
        label: cookieCutter.get('label'),
      });
      setCurrent({ ...changeStatus.data, label: cookieCutter.get('label') });
      const skip = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const antrianSkip = skip.data.filter(
        (x: any) => x.antrian === 'skip' && x.operator === Number(id)
      );
      setSkipAntrian(antrianSkip);
    } catch (error) {
      console.log(error);
    }
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
                  src={`/images/${logoAplikasi}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-3xl md:font-bold md:truncate">
                {/* <p>{namaAplikasi}</p> */}
                <p>{operator}</p>
              </div>

              <div className="flex-grow items-center justify-end m-2 font-semibold text-right">
                <button
                  type="button"
                  className="focus:outline-none tooltip inline-flex"
                  onClick={(e) => handleLogout(e)}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="font-bold mt-1">Logout</span>
                </button>
              </div>
            </header>
            <div className="flex-grow items-center justify-end m-2 font-semibold text-center">
              <div className="m-0 p-0">
                {now.format('dddd, Do MMMM YYYY')}, pukul{' '}
                {now.format('hh:mm a')}
              </div>
            </div>
            <div className="justify-center items-center m-6">
              <TitleColor
                className="text-2xl m-0 p-0 text-center"
                color="bg-dark"
              >
                Nomor Antrian
              </TitleColor>
            </div>
            <div>
              <div className="flex items-center justify-center">
                {!panggil ? (
                  <div>Anda belum memanggil antrian</div>
                ) : (
                  <div className="rounded-lg border shadow-lg p-10">
                    <div>
                      <TitleColor
                        className="text-6xl text-center pb-10"
                        color="bg-dark"
                      >
                        {panggil}
                      </TitleColor>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handdlePanggilan}
                    >
                      Panggil
                    </button>
                  </div>
                )}
              </div>
              {!panggil ? (
                <div className="flex gap-6 mt-10 items-center justify-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => handleMulai(e)}
                  >
                    Mulai antrian
                  </button>
                </div>
              ) : (
                <div className="flex gap-6 mt-10 items-center justify-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => handleNext(e)}
                  >
                    Selanjutnya
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={(e) => handleSkip(e)}
                  >
                    lewati
                  </button>
                </div>
              )}
            </div>
            <div className="w-full mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-3">
                <div className="card rounded-3xl">
                  <p className="text-center font-bold">
                    Antrian yang sudah dipanggil
                  </p>
                  <div className="flex-auto p-4">
                    {doneAntrian &&
                      doneAntrian.map((item: any) => {
                        return (
                          <div key={item.id} className="flex flex-wrap">
                            <div className="relative w-full max-w-full flex-grow flex-1 my-3">
                              <p className="text-center font-bold">
                                {item.kode}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="card rounded-3xl">
                  <p className="text-center font-bold">Antrian yang dilewati</p>
                  <div className="flex-auto p-4">
                    {skipAntrian &&
                      skipAntrian.map((item: any) => {
                        return (
                          <div key={item.id} className="flex flex-wrap">
                            <div className="relative w-full max-w-full flex-grow flex-1 my-3">
                              <p className="text-center font-bold">
                                {item.kode}
                              </p>
                            </div>
                            <div className="relative w-full max-w-full flex-grow flex-1 my-3">
                              <p className="text-center font-bold">|</p>
                            </div>
                            <div className="relative w-full max-w-full flex-grow flex-1 my-3">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={() => panggilLagi(item.id)}
                              >
                                Panggil lagi
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    <p className="text-sm text-orange-500 m-0 mt-2 -mb-2 p-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
      <Modal
        show={isShow}
        title="Konfirmasi"
        desc={<div>Konfirmasi Status no antrian sebelumnya?</div>}
        btnCloseShow
        btnCloseTitle="Selesai"
        btnCloseStyle="btn-success"
        btnCloseAction={() => currentDone()}
        btnProcessShow
        btnProcessTitle="Lewati"
        btnProcessStyle="btn-danger"
        btnProcessAction={() => {
          currentSkip();
        }}
      />
    </>
  );
};

export default Pendaftaran;
