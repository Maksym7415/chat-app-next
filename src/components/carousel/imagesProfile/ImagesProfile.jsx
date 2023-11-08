// +
import Image from "next/image";
import { EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ImagesProfile = ({ images, noImagesComponent }) => (
	<Swiper
		effect="fade"
		navigation
		pagination={{
			type: "progressbar",
			clickable: true,
		}}
		modules={[EffectFade, Navigation, Pagination]}
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
);

export default ImagesProfile;
