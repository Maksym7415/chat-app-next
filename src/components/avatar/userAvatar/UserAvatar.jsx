import { Avatar } from "@mui/material";
import { getNameShort } from "@/helpers/index";
import DefaultAvatar from "../defaultAvatar";
import BadgeUserAvatar from "../../badges/badgeUserAvatar";
import { REACT_APP_BASE_URL } from "@/core/constants/url";

const UserAvatar = ({
  sizeAvatar = 58,
  source,
  status = "",
  sizeBadge = 18,
  name = "",
}) => {
  // VARIABLES
  const nameShort = name ? getNameShort(name) : "";

  return (
    <div style={{ position: "relative" }}>
      <BadgeUserAvatar typeBadge={status} sizeBadge={sizeBadge}>
        {source ? (
          <Avatar
            src={`${REACT_APP_BASE_URL}/${source}`}
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
    </div>
  );
};

export default UserAvatar;
