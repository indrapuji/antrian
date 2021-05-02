/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Footer from 'components/Footer';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Home = () => {
  const [say, setSay] = useState('null');
  const [now, updateNow] = useState(moment().locale('id'));
  const [textRunning, setTextRunning] = useState('');
  const [logoAplikasi, setLogoAplikasi] = useState('');
  const [namaAplikasi, setNamaAplikasi] = useState('');

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
          setTextRunning(runningBanner[0].values);
        }
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

  const speak = (text: string, loops?: number) => {
    if (text !== 'null') {
      (function speakLoop(i: number) {
        setTimeout(() => {
          const speech = new SpeechSynthesisUtterance();
          speech.text = text;
          speech.lang = 'id-ID';
          speech.volume = 1;
          speech.rate = 1;
          speech.pitch = 0.9;
          window.speechSynthesis.speak(speech);
          setSay('null');
          // eslint-disable-next-line no-plusplus
          if (--i) speakLoop(i); // eslint-disable-line no-param-reassign
        }, 100);
      })(loops || 1);
    }
  };
  useEffect(() => speak(say), [say]);

  useEffect(() => {
    setInterval(() => {
      updateNow(moment().locale('id'));
    }, 1000);

    const socket = io();

    socket.on('status', (data) => {
      // setSay(data);
      console.log(data);
    });

    socket.on('pengumuman', (data) => {
      setSay(data);
      console.log(data);
    });

    socket.on('running_text', (data) => {
      setTextRunning(data);
    });

    socket.on('nama_aplikasi', (data) => {
      setNamaAplikasi(data);
    });
  }, []);

  return (
    <>
      <MetaSeo title="Masuk" description="Sistem Antrian" />
      <div className="flex">
        <main className="flex-grow flex flex-col min-h-screen w-full">
          <div className="h-full">
            <header className="h-20 flex items-center p-3 shadow bg-white">
              <div className="relative h-8 w-8">
                <Image
                  src={`/images/${logoAplikasi}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  onClick={() => setSay('null')}
                />
              </div>

              <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-3xl md:font-bold md:truncate">
                {namaAplikasi}
              </div>

              <div className="flex-grow items-center justify-end m-2 font-semibold text-right">
                <div className="m-0 p-0">
                  {now.format('dddd, Do MMMM YYYY')}
                </div>
                <div className="m-0 p-0">pukul {now.format('hh:mm a')}</div>
              </div>
            </header>

            <div
              className="marquee marquee-speed-drowsy h-16 flex items-center p-2 shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-cool-gray-100 font-bold text-xl text-shadow-sm"
              data-marquee={textRunning}
            />

            <div className="grid grid-cols-4 gap-0">
              <div className="col-span-4 md:col-span-3 p-4 pr-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 1</div>
                    </div>
                    <div className="p-6 pb-0 text-center">
                      <div className="p-0 m-0 text-lg font-bold">
                        Nomor Antrian
                      </div>
                      <TitleColor
                        className="text-9xl font-bold m-0 p-0 ml-1"
                        color="bg-dark"
                      >
                        17
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 2</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">
                        Nomor Antrian
                      </div>
                      <TitleColor
                        className="text-9xl font-bold m-0 p-0 ml-1"
                        color="bg-dark"
                      >
                        19
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 3</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">
                        Nomor Antrian
                      </div>
                      <TitleColor
                        className="text-9xl font-bold m-0 p-0 ml-1"
                        color="bg-dark"
                      >
                        20
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 4</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">
                        Nomor Antrian
                      </div>
                      <TitleColor
                        className="text-9xl font-bold m-0 p-0 ml-1"
                        color="bg-dark"
                      >
                        21
                      </TitleColor>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-1 p-4 pl-3">
                <div className="card rounded-3xl mb-6">
                  <div className="rounded-t-3xl bg-warning p-6 text-white text-center text-shadow-sm">
                    <div className="text-3xl font-bold">Selanjutnya</div>
                  </div>
                  <div className="p-5">
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 22
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 23
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 24
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 25
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 26
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 27
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 28
                    </div>
                    <div className="p-3 text-center text-xl font-bold">
                      Nomor Antrian 29
                    </div>
                    <div className="flex p-3 text-center text-xl font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-10 mx-auto text-rose-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
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

export default Home;
