import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress, ListItemText, Menu } from "@mui/material";
import {
	SDRoot,
	SDIconButton,
	SDWAvatar,
	SDImgAvatar,
	SDList,
	SDListItem,
	SDListItemIcon,
} from "./styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import * as config from "./config";
import DefaultAvatar from "@/components/avatar/defaultAvatar";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import { getNameShort } from "@/helpers/index";
import { userApi } from "@/store/user/api";

const Avatars = () => {
	// HOOKS
	const { enqueueSnackbar } = useSnackbar();

	const { isLoading: isLoadingAvatars } = userApi.useGetUserAvatarsQuery({});
	const [putMainPhoto] = userApi.usePutMainPhotoMutation({});
	const [deleteAvatar] = userApi.useDeleteAvatarMutation({});

	// SELECTORS
	const userAvatars = useSelector(({ userSlice }) => userSlice.avatars);
	const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

	// STATES
	const [photoIndexSelected, setPhotoIndexSelected] = useState(0);
	const [anchorEl, setAnchorEl] = useState();
	const [avatars, setAvatars] = useState([]);
	const [mainAvatar, setMainAvatar] = useState({});
	const open = Boolean(anchorEl);

	// FUNCTIONS
	const handleMenuAction = (key) => {
		// eslint-disable-next-line no-use-before-define
		handleClose();

		switch (key) {
			case config.actionsPhotoKeysData.addAPhoto.key:
				return key;
			case config.actionsPhotoKeysData.setMainPhoto.key:
				putMainPhoto({
					id: avatars[photoIndexSelected]?.id,
					additionalUrl: avatars[photoIndexSelected]?.id || "",
					params: {
						url: avatars[photoIndexSelected]?.fileName,
					},
				})
					.unwrap()
					.then(async () => {
						enqueueSnackbar("Success set main photo", {
							variant: "success",
						});
					});
				return key;
			case config.actionsPhotoKeysData.deletePhoto.key:
				deleteAvatar({
					id: avatars[photoIndexSelected]?.id,
					params: {
						id: avatars[photoIndexSelected]?.id,
					},
				})
					.unwrap()
					.then(async () => {
						enqueueSnackbar("Success delete photo", {
							variant: "success",
						});
					});
				return key;
			default:
				return key;
		}
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// USEEFFECTS
	useEffect(() => {
		if (
			JSON.stringify(userAvatars.data) !== JSON.stringify(avatars) &&
			userAvatars.length
		) {
			const findMainAvatar = userAvatars.find(
				(item) => item.defaultAvatar,
			);
			findMainAvatar && setMainAvatar(findMainAvatar);
			setAvatars(userAvatars);
		}
	}, [userAvatars]);

	if (isLoadingAvatars) {
		return (
			<RenderInfoCenterBox
				optionsTagSx={{ height: "300px", width: "300px" }}
			>
				<CircularProgress size={100} />
			</RenderInfoCenterBox>
		);
	}

	if (!userAvatars.length) {
		const sizeAvatar = "300";
		const fullName =
			userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`;
		const nameShort = fullName ? getNameShort(fullName) : null;

		return (
			<SDWAvatar>
				<DefaultAvatar
					name={nameShort}
					width={`${sizeAvatar}px`}
					height={`${sizeAvatar}px`}
					fontSize="100px"
				/>
			</SDWAvatar>
		);
	}

	return (
		<>
			<SDRoot>
				<Swiper
					navigation
					modules={[Navigation, Pagination]}
					spaceBetween={10}
					style={{
						width: "300px",
						height: "300px",
						maxWidth: "300px",
						maxHeight: "300px",
					}}
					onRealIndexChange={(element) =>
						setPhotoIndexSelected(element.activeIndex)
					}
				>
					{avatars?.length ? (
						avatars?.map((item) => (
							<SwiperSlide
								key={item.id}
								style={{ display: "flex" }}
							>
								<SDImgAvatar
									src={`${process.env.BASE_URL}/${item.fileName}`}
									width={1000}
									height={300}
									alt="Picture of the author"
								/>
							</SwiperSlide>
						))
					) : (
						<></>
					)}
				</Swiper>
				<SDIconButton
					aria-label="more"
					id="long-button"
					aria-controls={open ? "long-menu" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVertIcon />
				</SDIconButton>
				{avatars[photoIndexSelected]?.id === mainAvatar?.id && (
					<SDIconButton
						color="primary"
						component="span"
					>
						<CheckCircleIcon fontSize="medium" />
					</SDIconButton>
				)}
			</SDRoot>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<SDList>
					{config.actionsPhoto.map((item) => {
						const icon = item?.icon || null;
						const id = item?.id || null;
						const title = item?.title || null;
						const key = item?.key || null;

						if (
							avatars[photoIndexSelected]?.id ===
								mainAvatar?.id &&
							key === config.actionsPhotoKeysData.setMainPhoto.key
						) {
							return (
								<SDListItem
									key={id}
									onClick={() => handleMenuAction(key)}
								>
									<SDListItemIcon>{icon}</SDListItemIcon>
									<ListItemText primary={title} />
								</SDListItem>
							);
						}
						return <></>;
					})}
				</SDList>
			</Menu>
		</>
	);
};

export default Avatars;
