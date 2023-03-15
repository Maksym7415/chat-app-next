import { StyledBadge } from "./styles";

const BadgeUserAvatar = ({
	typeBadge,
	overlap = "circular",
	anchorOrigin = { vertical: "bottom", horizontal: "right" },
	variant = "dot",
	sizeBadge = 18,
	children,
}) => {
	return (() => {
		switch (typeBadge) {
			case "online":
				return (
					<StyledBadge
						overlap={overlap}
						anchorOrigin={anchorOrigin}
						variant={variant}
					>
						{children}
					</StyledBadge>
				);
			case "selected":
				return <div></div>;

			default:
				return <>{children}</>;
		}
	})();
};

export default BadgeUserAvatar;
