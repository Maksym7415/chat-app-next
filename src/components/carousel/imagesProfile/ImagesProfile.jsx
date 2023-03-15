import Image from "next/image";
import React, { useState } from "react";
import { EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ImagesProfile = ({ images, noImagesComponent }) => {
	// STATES
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<>
			<Swiper
				effect="fade"
				navigation
				pagination={{
					type: "progressbar",
					clickable: true,
				}}
				modules={[EffectFade, Navigation, Pagination]}
				className="mySwiper"
				onRealIndexChange={(element) =>
					setActiveIndex(element.activeIndex)
				}
			>
				{images?.length ? (
					images?.map((image) => (
						<SwiperSlide key={image.id}>
							<Image
								src={image.src}
								width={1000}
								height={1000}
								alt="Picture of the author"
							/>
						</SwiperSlide>
					))
				) : (
					<SwiperSlide>
						{noImagesComponent && noImagesComponent()}
					</SwiperSlide>
				)}
			</Swiper>
		</>
	);
};

export default ImagesProfile;
