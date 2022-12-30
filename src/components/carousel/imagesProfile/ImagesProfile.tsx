import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

const ImagesProfile = ({ images, noImagesComponent }: any) => {
  // REFS
  const swiperRef = useRef(null);

  // STATES
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        effect={"fade"}
        navigation={true}
        pagination={{
          type: "progressbar",
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
        ref={swiperRef}
        onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
      >
        {images?.length ? (
          images?.map((image) => {
            return (
              <SwiperSlide key={image.id}>
                <img src={image.src} />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>{noImagesComponent && noImagesComponent()}</SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default ImagesProfile;
