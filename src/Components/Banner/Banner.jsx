// Complete

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={true}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div
          className="w-full bg-center bg-cover h-[38rem]"
          style={{
            backgroundImage: "url('https://i.ibb.co/ydXYjHb/asset-2.jpg')",
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center w-1/2">
              <h1 className="text-3xl text-center font-semibold text-white lg:text-5xl">
                "Empower Your Team, Optimize Resources, Thrive Together!"
              </h1>
              <Link to={"/employee-signup"}>
                <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Join As Employee
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="w-full bg-center bg-cover h-[38rem]"
          style={{
            backgroundImage: "url('https://i.ibb.co/zbNdST2/asset-3.jpg')",
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center w-1/2">
              <h1 className="text-3xl text-center font-semibold text-white lg:text-5xl">
                "Effortless Asset Management for HR/Admin Professionals"
              </h1>
              <Link to={"/hr-signup"}>
                <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Join As HR/Admin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
