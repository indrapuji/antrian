/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
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
  const [listAntrian, setListAntrian] = useState<any>();
  const [listOperator, setListOperator] = useState<any>();
  const [isRow, setIsrow] = useState<any>();

  useEffect(() => {
    getData();
    getUser();
    getListAntrian();
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

  const getListAntrian = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: '/api/daftar',
      });
      const antrian = data
        .filter((x: any) => x.antrian === 'waiting')
        .sort((a: any, b: any) => (a.kode > b.kode ? 1 : -1));
      setListAntrian(antrian);
    } catch (error) {
      console.log(error);
    }
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
          speech.pitch = 0;
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
      setSay(data);
    });

    socket.on('panggilan', (data) => {
      setSay(`Nomor antrian ${data.kode}, silahkan ke ${data.label}`);
      getUser();
    });

    socket.on('running_text', (data) => {
      setTextRunning(data);
    });

    socket.on('nama_aplikasi', (data) => {
      setNamaAplikasi(data);
    });

    socket.on('pendaftaran', (data) => {
      setListAntrian(data);
    });

    socket.on('operator', (data) => {
      if (data) {
        getUser();
      }
    });
  }, []);

  const mergeOperatorAntrian = (op: any, antrian: any) =>
    op.map((opItem: any) => ({
      ...antrian.find(
        (antrianItem: any) => antrianItem.operator === opItem.id && antrianItem
      ),
      ...opItem,
    }));

  const getAntrianPanggil = async () => {
    try {
      const antrianCounter = await axios({
        method: 'get',
        url: '/api/daftar',
      });
      const antri = antrianCounter.data
        .filter((x: any) => x.antrian === 'calling')
        .sort((a: any, b: any) => (a.operator > b.operator ? 1 : -1));
      return antri;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      const userList = await axios({
        method: 'GET',
        url: '/api/user',
      });
      const filterOperator = userList.data
        .filter((x: any) => x.role !== 'ADMIN')
        .sort((a: any, b: any) => (a.label > b.label ? 1 : -1));

      const antrianPanggil = await getAntrianPanggil();

      const merged = mergeOperatorAntrian(filterOperator, antrianPanggil);
      console.log(merged);

      setListOperator(merged);
      if (merged.length < Number(4)) {
        setIsrow('2');
      } else {
        const count = Math.ceil(merged.length / Number(2));
        setIsrow(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaSeo title="Screen" description="Sistem Antrian" />
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
                <div className={`grid grid-cols-1 md:grid-cols-${isRow} gap-6`}>
                  {listOperator &&
                    listOperator.map((item: any) => {
                      return (
                        <div key={item.id} className="card rounded-3xl">
                          <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                            <div className="text-3xl font-bold">
                              {item.label}
                            </div>
                          </div>
                          <div className="p-6 pb-0 text-center">
                            <div className="p-0 m-0 text-lg font-bold">
                              Nomor Antrian
                            </div>
                            <TitleColor
                              className="text-9xl font-bold m-0 p-0 ml-1"
                              color="bg-dark"
                            >
                              {item.kode !== undefined ? item.kode : '--'}
                            </TitleColor>
                          </div>
                        </div>
                      );
                    })}
                  {/* <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 1</div>
                    </div>
                    <div className="p-6 pb-0 text-center">
                      <div className="p-0 m-0 text-lg font-bold">Nomor Antrian</div>
                      <TitleColor className="text-9xl font-bold m-0 p-0 ml-1" color="bg-dark">
                        17
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 2</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">Nomor Antrian</div>
                      <TitleColor className="text-9xl font-bold m-0 p-0 ml-1" color="bg-dark">
                        19
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 3</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">Nomor Antrian</div>
                      <TitleColor className="text-9xl font-bold m-0 p-0 ml-1" color="bg-dark">
                        20
                      </TitleColor>
                    </div>
                  </div>
                  <div className="card rounded-3xl">
                    <div className="rounded-t-3xl bg-danger p-6 text-white text-center text-shadow-sm">
                      <div className="text-3xl font-bold">Operator 4</div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="p-0 m-0 text-lg font-bold">Nomor Antrian</div>
                      <TitleColor className="text-9xl font-bold m-0 p-0 ml-1" color="bg-dark">
                        21
                      </TitleColor>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1 p-4 pl-3">
                <div className="card rounded-3xl mb-6">
                  <div className="rounded-t-3xl bg-warning p-6 text-white text-center text-shadow-sm">
                    <div className="text-3xl font-bold">Selanjutnya</div>
                  </div>
                  <div className="p-5">
                    {listAntrian &&
                      listAntrian.slice(0, 8).map((item: any) => {
                        return (
                          <div className="p-3 text-center text-xl font-bold">
                            Nomor Antrian {item.kode}
                          </div>
                        );
                      })}
                    {listAntrian &&
                      listAntrian.length < 8 &&
                      [...Array(8 - listAntrian.length)].map((_, i) => {
                        return (
                          <div className="p-3 text-center text-xl font-bold">
                            -
                          </div>
                        );
                      })}
                    {/* <div className="p-3 text-center text-xl font-bold">Nomor Antrian 22</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 23</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 24</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 25</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 26</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 27</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 28</div>
                    <div className="p-3 text-center text-xl font-bold">Nomor Antrian 29</div> */}
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
