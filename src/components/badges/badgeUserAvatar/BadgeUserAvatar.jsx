import { SDBadge } from "./styles";
import { STATUS_AVATAR } from "@/constants/general";

const BadgeUserAvatar = ({
	typeBadge,
	overlap = "circular",
	anchorOrigin = { vertical: "bottom", horizontal: "right" },
	variant = "dot",
	children,
}) => {
		switch (typeBadge) {
			case STATUS_AVATAR.online:
				return (
					<SDBadge
						overlap={overlap}
						anchorOrigin={anchorOrigin}
						variant={variant}
					>
						{children}
					</SDBadge>
				);
			case STATUS_AVATAR.selected:
				return <div />;

			default:
				return <>{children}</>;
		}
}

export default BadgeUserAvatar;
