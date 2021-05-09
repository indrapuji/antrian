/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// import animationConfig from 'components/layout/dashboard/data/animation.json';
import axios from 'axios';
import Footer from 'components/Footer';
import Navbar from 'components/layout/dashboard/Navbar';
// import NotificationBar from 'components/layout/dashboard/NotificationBar';
import Sidebar from 'components/layout/dashboard/Sidebar';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useBreakpoint from 'utils/useBreakpoint';

interface LayoutProps {
  children?: JSX.Element | JSX.Element[] | HTMLElement | HTMLElement[] | string;
}

const Dashboard = ({ children }: LayoutProps) => {
  const [isDesktop, setDesktop] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const [isNavRightMenuUser, setNavRightMenuUser] = useState(false);
  const [nama, setNama] = useState('');
  const [role, setRole] = useState('');
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const [logoAplikasi, setLogoAplikasi] = useState('');

  const breakpoint = useBreakpoint('md');

  const router = useRouter();
  useEffect(() => {
    setNama(cookieCutter.get('nama'));
    setRole(cookieCutter.get('role'));
    getData();
    if (!cookieCutter.get('token')) {
      router.push('/login');
    }
  }, []);

  const socket = io();
  socket.on('nama_aplikasi', (data) => {
    setNamaAplikasi(data);
  });

  socket.on('logo_aplikasi', (data) => {
    setLogoAplikasi(data);
  });

  useEffect(() => {
    if (breakpoint) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (isDesktop) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isDesktop]);

  const getData = () => {
    axios({
      method: 'GET',
      url: '/api/aplikasi',
    })
      .then((res) => {
        const aplikasiLogo = res.data.filter((x: any) => x.keys === 'logo');
        if (aplikasiLogo.length > 0) {
          setLogoAplikasi(aplikasiLogo[0].values);
          socket.emit('logo_aplikasi', aplikasiLogo[0].values);
        }
        const aplikasiNama = res.data.filter((x: any) => x.keys === 'nama');
        if (aplikasiNama.length > 0) {
          setNamaAplikasi(aplikasiNama[0].values);
          socket.emit('nama_aplikasi', aplikasiNama[0].values);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex">
        <Sidebar
          isOpen={isOpen}
          isDesktop={isDesktop}
          setOpen={setOpen}
          isNama={nama}
          isRole={role}
        />

        <main className="flex-grow flex flex-col min-h-screen w-full">
          <Navbar
            isOpen={isOpen}
            setOpen={setOpen}
            isNavRightMenuUser={isNavRightMenuUser}
            setNavRightMenuUser={setNavRightMenuUser}
            isName={namaAplikasi}
            isLogo={logoAplikasi}
          />

          <div
            className="h-full p-4 md:p-6"
            onClick={() => setNavRightMenuUser(false)}
            aria-hidden="true"
          >
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

Dashboard.defaultProps = {
  children: <></>,
};

export default Dashboard;
