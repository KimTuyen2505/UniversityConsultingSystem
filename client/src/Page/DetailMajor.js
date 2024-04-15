import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Tabs, Timeline } from "antd";

import * as env from "../env.js";

export default function DetailMajor() {
  const { idMajor } = useParams();
  const url = "https://tuyensinh.tdmu.edu.vn";
  const [listImage, setListImage] = useState([]);
  useEffect(() => {
    axios
      .get(env.API_URL + "/major", {})
      .then(async function (responseMajor) {
        let major = await responseMajor.data.dataMajors.find(
          (x) => x._id === idMajor
        );
        if (major) {
          axios
            .post(env.API_URL + "/fetch-detail-major", {
              link: url.concat(major.detailMajor),
            })
            .then(function (response) {
              console.log(response.data);
              setListImage(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const items = [
    {
      label: "Thông tin",
      key: "info",
      children: (
        <div>
          {listImage.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
      ),
    },
    {
      label: "Cựu sinh viên",
      key: "alumni",
      children: (
        <div
          className="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full m-5 cursor-pointer hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102"
          onClick={showModal}
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-32 w-full object-cover"
                src="/Images/IdolMinhTriet.png"
                alt="Event image"
              />
            </div>
            <div className="p-8">
              <p className="block mt-1 text-lg leading-tight font-medium text-black">
                Nguyễn Phạm Minh Triết
              </p>
              <p className="mt-2 text-gray-500">Bậc thầy về lập trình</p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={null}
        className="w-[1200px] flex justify-center"
      >
        <div className="relative text-gray-800 bg-gray-50 w-[1200px]">
          <header>
            <nav className="w-full">
              <div className="flex justify-between w-full px-16 py-8">
                <div></div>
              </div>
            </nav>
          </header>
          <section className="flex flex-col items-center justify-center h-screen  -my-20 md:-mt-48 px-8">
            <div className="flex flex-col items-center justify-center text-center h-screen-half">
              <img
                className="object-cover w-36 h-36 rounded-full mb-5 ring-2 ring-gray-500/50 ring-offset-[10px]"
                src="/Images/IdolMinhTriet.png"
                alt="Your Name Here"
              />
              <div className="gap-y-3">
                <h1 className="text-5xl">Nguyễn Phạm Minh Triết</h1>
              </div>
            </div>
          </section>
          <div className="flex flex-col w-full space-y-12 text-center md:text-left">
            <div className="flex flex-col px-10 md:px-20">
              <h3 className="text-xl font-bold">Skills</h3>
              <br />
              <span className="text-lg">Teamwork</span>
              <span className="text-lg">Communication</span>
              <span className="text-lg">Problem-solving</span>
              <span className="text-lg">Time Organization</span>
            </div>
            <div className="px-10 md:px-20">
              <h3 className="text-xl font-bold">Summary</h3>
              <br />
              <p className="w-full">
                I am a former student who has transitioned into working as a
                fullstack developer at a technology company. During my time in
                the workforce, I have accumulated extensive experience in
                developing both frontend and backend aspects of projects. I
                possess the ability to work with popular tools and technologies
                in this field without being limited by any specific programming
                language or framework. A solid understanding of system design
                and working with databases is also an important part of my work.
              </p>
            </div>
            <div className="px-10 pb-10 md:px-20">
              <br />
              <h3 className="text-xl font-bold">Contact</h3>
              <div className="text-xl">Zalo: 0373 053 689</div>
              <div className="text-xl">
                Facebook: https://www.facebook.com/triet.nguyenphamminh
              </div>
            </div>
          </div>
          <hr className="border-gray-400 mx-44" />
          <section className="px-20 mt-10">
            <h4 className="mb-8 text-3xl font-bold text-center md:text-left">
              Experience
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-6 my-10">
              <div className="flex flex-col col-span-2 mb-4 md:mb-0">
                <h5 className="text-xl md:text-2xl font-bold">
                  Full Stack Developer
                </h5>
                <h6 className="text-lg font-bold">Data House</h6>
                <p>Jan 2023 - present</p>
              </div>
              <div className="flex flex-col col-span-4">
                <p>
                  Working as a fullstack developer also presents a challenge in
                  maintaining updates on new technologies and developing
                  personal skills. However, with passion and commitment, I am
                  always willing to learn and apply the latest knowledge to my
                  work to ensure that projects are implemented efficiently and
                  meet customer requirements.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 my-10">
              <div className="flex flex-col col-span-2 mb-4 md:mb-0">
                <h5 className="text-xl md:text-2xl  font-bold">
                  Software Engine
                </h5>
                <h6 className="text-lg font-bold">TMA TECH GROUP</h6>
                <p>Feb 2022 - Jan 2023</p>
              </div>
              <div className="flex flex-col col-span-4">
                <p>
                  An important aspect of working in the technology industry is
                  collaborating in a diverse environment, with colleagues from
                  different cultural backgrounds and skill sets. Teamwork is key
                  to solving complex problems and fostering innovation. Projects
                  are often divided into smaller teams, and working together to
                  achieve common goals is crucial.
                </p>
              </div>
            </div>
          </section>
          <hr className="border-gray-400 mx-44" />
          <section className="px-20 mt-10">
            <h4 className="mb-8 text-3xl font-bold text-center md:text-left">
              Education
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-6 my-10">
              <div className="flex flex-col col-span-2 mb-4 md:mb-0">
                <h5 className="text-xl md:text-2xl  font-bold">
                  Information Technology
                </h5>
                <h6 className="text-lg font-bold">Thu Dau Mot University</h6>
                <p>Jan 2019 - Jan 2024</p>
              </div>
              <div className="flex flex-col col-span-4 ">
                <p>
                  I always set high goals for myself and strive to give my best
                  in every course and project. My passion and curiosity for
                  technology have driven me to continuously learn and delve
                  deeper into new concepts and technologies. I often seek
                  opportunities to participate in additional courses, real-world
                  projects, and events related to the field of information
                  technology to expand my knowledge and skills.
                </p>
              </div>
            </div>
            <Timeline
              mode="left"
              items={[
                {
                  label: "22-04-2023",
                  children:
                    "Won first prize The 1st TDMU Student Infosec Contest 2023",
                },
                {
                  label: "06-11-2022",
                  children:
                    "Won third prize in The 8th TDMU Student Programming Contest",
                },
                {
                  label: "12-01-2022",
                  children:
                    "Takes on the position of vice president of the IT club",
                },
                {
                  label: "11-12-2020",
                  children:
                    "Consolation prize at the 29th Vietnamese Student Informatics Olympiad",
                },
              ]}
            />
          </section>
          <footer className="absolute w-full h-36 bottom-0 p-8 px-16 bg-gray-800 text-gray-50"></footer>
          <div className="h-80"></div>
        </div>
      </Modal>
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          <Tabs defaultActiveKey="1" type="card" items={items} />
        </div>
      </div>
    </div>
  );
}
