import React from "react";
import { Event } from "./Event";
import Eid from "../assets/Eid.png";
import martin from "../assets/MartinGarrix.png";
import paint from "../assets/Paintball.png";
import marmara from "../assets/Marmara.png";
import "../Styles/eventslider.css";
import OurButton from "./OurButton";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { user, prefferedGroups } from "../data/helpers";

export const EventSlider = ({ object, label, event }) => {
  return (
    <div className="event-slider">
      <label htmlFor="slider" className="slider-label">
        {label}
      </label>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {object?.map((group) => (
          <SwiperSlide>
            <Event
              event={event && "event"}
              label={group.name}
              imageUrl={
                group.group_image ? group.group_image : group.event_image
              }
              id={group.group_id ? group.group_id : group.event_id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <OurButton label="Show more" position="center" />
    </div>
  );
};
