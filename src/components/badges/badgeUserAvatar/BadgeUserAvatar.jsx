import { StyledBadge } from "./styles";

const BadgeUserAvatar = ({
	typeBadge,
	overlap = "circular",
	anchorOrigin = { vertical: "bottom", horizontal: "right" },
	variant = "dot",
	children,
}) =>
	(() => {
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
				return <div />;

			default:
				return <>{children}</>;
		}
	})();

export default BadgeUserAvatar;
