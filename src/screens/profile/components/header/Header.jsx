import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "@/components/avatar/defaultAvatar";
import ImagesProfile from "@/components/carousel/imagesProfile";

// rework avatars

// STYLES
const classes = {
	container: "relative z-2",
	wrapper: "flex flex-col",
	containerTop: "flex px-[10px] py-[5px]",
	content: "relative flex",
	closeIcon: "",
};

//test
const imagesTest = [
	{
		id: 1,
		src: "https://swiperjs.com/demos/images/nature-1.jpg",
	},
	{
		id: 2,
		src: "https://swiperjs.com/demos/images/nature-2.jpg",
	},
	{
		id: 3,
		src: "https://swiperjs.com/demos/images/nature-3.jpg",
	},
	{
		id: 4,
		src: "https://swiperjs.com/demos/images/nature-4.jpg",
	},
];

const Header = ({ setting, closeDrawer }) => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const userAvatars = useSelector(({ userSlice }) => userSlice.avatars);
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);

	// STATES
	const [images, setImages] = useState([]);

	// USEEFFECTS
	useEffect(() => {
		setting.avatar &&
			!images.length &&
			setImages([{ id: 1, fileName: setting.avatar }]);
	}, [setting.avatar]);

	useEffect(() => {
		if (
			JSON.stringify(userAvatars.data) !== JSON.stringify(images) &&
			userAvatars.length &&
			setting.isOwnerProfile
		) {
			setImages(userAvatars);
		}
	}, [userAvatars]);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.containerTop}>
					<IconButton
						onClick={closeDrawer}
						size="large"
						className={classes.closeIcon}
					>
						<CloseIcon />
					</IconButton>
				</div>
				<div className={classes.content}>
					<ImagesProfile
						images={imagesTest}
						noImagesComponent={() => (
							<DefaultAvatar
								name={setting.nameShort}
								width={"100%"}
								height={"300px"}
								fontSize={"150px"}
								isSquare={true}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
