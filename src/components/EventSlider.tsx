import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/swiper-bundle.css";

import { Event } from "./Event";

import "../Styles/eventslider.css";

interface EventSliderProps {
  object: any;
  label: string;
  isEvent?: boolean;
}

// Fixed
export const EventSlider = ({
  object,
  label,
  isEvent = false,
}: EventSliderProps) => {
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
              isEvent={isEvent}
              label={group.name}
              imageUrl={
                group.group_image ? group.group_image : group.event_image
              }
              id={isEvent ? group.event_id : group.group_id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
