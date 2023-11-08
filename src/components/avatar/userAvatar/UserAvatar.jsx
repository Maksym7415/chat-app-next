import { Avatar } from "@mui/material";
import { SDRoot } from "./styles";
import DefaultAvatar from "../defaultAvatar";
import BadgeUserAvatar from "@/components/badges/badgeUserAvatar";
import { getNameShort } from "@/helpers/index";

const UserAvatar = ({
	sizeAvatar = 58,
	source,
	status = "",
	sizeBadge = 18,
	name = "",
	optionsTags = {
		root: {}
	}
}) => {
	// VARIABLES
	const nameShort = name ? getNameShort(name) : "";

	return (
		<SDRoot {...optionsTags.root}>
			<BadgeUserAvatar
				typeBadge={status}
				sizeBadge={sizeBadge}
			>
				{source ? (
					<Avatar
						src={`${process.env.BASE_URL}/${source}`}
						style={{ height: sizeAvatar, width: sizeAvatar }}
					/>
				) : (
					<DefaultAvatar
						name={nameShort}
						width={`${sizeAvatar}px`}
						height={`${sizeAvatar}px`}
					/>
				)}
			</BadgeUserAvatar>
		</SDRoot>
	);
};

export default UserAvatar;
