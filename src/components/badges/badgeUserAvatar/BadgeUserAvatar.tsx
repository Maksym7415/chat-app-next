import React from "react";
import { StyledBadge } from "./styles";

interface IProps {
  typeBadge: string;
  overlap?: string | any;
  anchorOrigin?: any;
  variant?: string | any;
  sizeBadge: number;
  children: React.ReactNode;
}

const BadgeUserAvatar = ({
  typeBadge,
  overlap = "circular",
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  variant = "dot",
  sizeBadge = 18,
  children,
}: IProps) => {
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
