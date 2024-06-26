import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Header({ user, setUser }) {
  const [modal, contextHolder] = Modal.useModal();
  const [chooseTab, setChooseTab] = useState(0);
  const confirm = () => {
    modal.confirm({
      title: "XÁC NHẬN",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn đăng xuất?",
      okText: "Đăng xuất",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        localStorage.removeItem("dataUser");
        setUser(null);
        window.location.href = "/";
      },
    });
  };
  return (
    <header className="relative z-50 w-full h-24">
      {contextHolder}
      <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
        <Link to="/" onClick={() => setChooseTab(0)}>
          <img width={130} src="/Images/logo-TDMU.png" alt="TDMU" />
        </Link>

        <nav
          id="nav"
          className="absolute top-0 left-0 z-50 flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
        >
          <Link
            onClick={() => setChooseTab(2)}
            to={"/majors"}
            className={
              chooseTab === 2
                ? "uppercase font-bold duration-100 transition-color text-white bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
                : "uppercase font-bold duration-100 transition-color hover:text-white hover:bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
            }
          >
            ĐÀO TẠO
          </Link>
          <Link
            onClick={() => setChooseTab(3)}
            to={"/testing"}
            className={
              chooseTab === 3
                ? "uppercase font-bold duration-100 transition-color text-white bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
                : "uppercase font-bold duration-100 transition-color hover:text-white hover:bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
            }
          >
            KIỂM TRA
          </Link>
          <Link
            onClick={() => setChooseTab(4)}
            to={"/forum"}
            className={
              chooseTab === 4
                ? "uppercase font-bold duration-100 transition-color text-white bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
                : "uppercase font-bold duration-100 transition-color hover:text-white hover:bg-slate-400 h-full flex items-center justify-center pl-5 pr-5"
            }
          >
            Diễn đàn
          </Link>
        </nav>

        <div className="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
          {user ? (
            <div>
              <Link
                onClick={() => setChooseTab(0)}
                to={`/profile/${user._id}`}
                className="relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 lg:text-white sm:mr-3 md:mt-0"
              >
                {user.given_name}
              </Link>
              <button
                onClick={() => {
                  confirm();
                  setChooseTab(0);
                }}
                className="relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all duration-300 bg-indigo-700 rounded shadow-md fold-bold lg:bg-white lg:text-indigo-700 lg:shadow-none hover:shadow-xl"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div>
              <Link
                to={"/login"}
                className="relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 lg:text-white sm:mr-3 md:mt-0"
              >
                Đăng nhập
              </Link>
              <Link
                to={"/register"}
                className="relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all duration-300 bg-indigo-700 rounded shadow-md fold-bold lg:bg-white lg:text-indigo-700 lg:shadow-none hover:shadow-xl"
              >
                Đăng ký
              </Link>
            </div>
          )}
          <svg
            className="absolute top-0 left-0 hidden w-screen max-w-4xl -mt-64 -ml-12 lg:block"
            viewBox="0 0 818 815"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="c">
                <stop stop-color="#E614F2" offset="0%" />
                <stop stop-color="#FC3832" offset="100%" />
              </linearGradient>
              <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="f">
                <stop stop-color="#657DE9" offset="0%" />
                <stop stop-color="#1C0FD7" offset="100%" />
              </linearGradient>
              <filter
                x="-4.7%"
                y="-3.3%"
                width="109.3%"
                height="109.3%"
                filterUnits="objectBoundingBox"
                id="a"
              >
                <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                  stdDeviation="8"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                  in="shadowBlurOuter1"
                />
              </filter>
              <filter
                x="-4.7%"
                y="-3.3%"
                width="109.3%"
                height="109.3%"
                filterUnits="objectBoundingBox"
                id="d"
              >
                <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                  stdDeviation="8"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  in="shadowBlurOuter1"
                />
              </filter>
              <path
                d="M160.52 108.243h497.445c17.83 0 24.296 1.856 30.814 5.342 6.519 3.486 11.635 8.602 15.12 15.12 3.487 6.52 5.344 12.985 5.344 30.815v497.445c0 17.83-1.857 24.296-5.343 30.814-3.486 6.519-8.602 11.635-15.12 15.12-6.52 3.487-12.985 5.344-30.815 5.344H160.52c-17.83 0-24.296-1.857-30.814-5.343-6.519-3.486-11.635-8.602-15.12-15.12-3.487-6.52-5.343-12.985-5.343-30.815V159.52c0-17.83 1.856-24.296 5.342-30.814 3.486-6.519 8.602-11.635 15.12-15.12 6.52-3.487 12.985-5.343 30.815-5.343z"
                id="b"
              />
              <path
                d="M159.107 107.829H656.55c17.83 0 24.296 1.856 30.815 5.342 6.518 3.487 11.634 8.602 15.12 15.12 3.486 6.52 5.343 12.985 5.343 30.816V656.55c0 17.83-1.857 24.296-5.343 30.815-3.486 6.518-8.602 11.634-15.12 15.12-6.519 3.486-12.985 5.343-30.815 5.343H159.107c-17.83 0-24.297-1.857-30.815-5.343-6.519-3.486-11.634-8.602-15.12-15.12-3.487-6.519-5.343-12.985-5.343-30.815V159.107c0-17.83 1.856-24.297 5.342-30.815 3.487-6.519 8.602-11.634 15.12-15.12 6.52-3.487 12.985-5.343 30.816-5.343z"
                id="e"
              />
            </defs>
            <g fill="none" fill-rule="evenodd" opacity=".9">
              <g transform="rotate(68 420.452 417.167)">
                <use fill="url(#c)" xlinkHref="#b" />
              </g>
              <g transform="rotate(29 450.929 395.496)">
                <use fill="#000" filter="url(#d)" xlinkHref="#e" />
                <use fill="url(#f)" xlinkHref="#e" />
              </g>
            </g>
          </svg>
        </div>

        <div
          id="nav-mobile-btn"
          className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
        >
          <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
          <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
