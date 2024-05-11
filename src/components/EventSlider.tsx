import React from "react";
import { Event } from "./Event";
import Eid from "../assets/Eid.png";
import martin from "../assets/MartinGarrix.png";
import paint from "../assets/Paintball.png";
import marmara from "../assets/Marmara.png";
import "../Styles/eventslider.css";
import { OurButton } from "./OurButton";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

export const EventSlider = () => {
  return (
    <div className="event-slider">
      <label htmlFor="slider" className="slider-label">
        Your Events{" "}
      </label>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Event label={"Eid Celebration"} imageUrl={Eid} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Marmara Trip"} imageUrl={marmara} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Paintball"} imageUrl={paint} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Martix Garix"} imageUrl={martin} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Eid Celebration"} imageUrl={Eid} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Marmara Trip"} imageUrl={marmara} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Paintball"} imageUrl={paint} />
        </SwiperSlide>
        <SwiperSlide>
          <Event label={"Martix Garix"} imageUrl={martin} />
        </SwiperSlide>
      </Swiper>
      <OurButton label="Show more" position="center" />
      {/* <div className="event-slider">
        <a href="#">
          <img src={arrowleft} alt="arrow left" className="arrow" />
        </a>

        <Event label={"Eid Celebration"} imageUrl={Eid} />
        <Event label={"Marmara Trip"} imageUrl={marmara} />
        <Event label={"Paintball"} imageUrl={paint} />
        <Event label={"Martix Garix"} imageUrl={martin} />
        <a href="#">
          <img src={arrowright} alt="arrow right" className="arrow" />
        </a>
      </div>
      <OurButton label="Show More" margin="40px 0 30px 40%" /> */}
    </div>
  );
};
