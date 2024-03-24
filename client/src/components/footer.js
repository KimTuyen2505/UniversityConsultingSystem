import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-4 pt-12 pb-8 text-white bg-white border-t border-gray-200">
      <div className="container flex flex-col justify-center max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
        <div className="w-full pl-12 mr-4 text-left lg:w-1/2 sm:text-center sm:pl-0 lg:text-left">
          <img width={100} src="/Images/logo-TDMU.png" alt="TDMU" />
          <p className="mt-6 mr-4 text-base text-gray-500">
            <span className="font-bold">Địa chỉ: </span>06 Trần Văn Ơn, Phú Hòa,
            Thủ Dầu Một, Bình Dương
          </p>
        </div>
        <div className="block pl-10 mt-6 text-sm lg:w-1/2 sm:flex lg:mt-0">
          <div className="flex flex-col w-full text-gray-700">
            <div className="inline-block px-3 py-2 mt-5 font-bold text-gray-800 uppercase md:mt-0">
              Theo dõi
            </div>
            <div className="pl-4 mt-2">
              <Link to="https://www.facebook.com/TDMU.IT.CLUB">
                https://www.facebook.com/TDMU.IT.CLUB
              </Link>
              <br />
              <Link to="https://www.facebook.com/tuyensinhTDMU">
                https://www.facebook.com/tuyensinhTDMU
              </Link>
            </div>
          </div>
        </div>
        <div className="block pl-10 mt-6 text-sm lg:w-1/2 sm:flex lg:mt-0">
          <div className="flex flex-col w-full text-gray-700">
            <div className="inline-block px-3 py-2 mt-5 font-bold text-gray-800 uppercase md:mt-0">
              Email
            </div>
            <div className="pl-4 mt-2">
              <div>clbit@tdmu.edu.vn</div>
              <div>trungtamtuyensinh@tdmu.edu.vn</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 mt-10 text-center text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} Phát triển bởi Câu lạc bộ IT.
      </div>
    </footer>
  );
}
