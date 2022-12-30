import React from "react";
import { Avatar } from "@mui/material";
import { getNameShort } from "../../../helpers";
import DefaultAvatar from "../defaultAvatar";
import BadgeUserAvatar from "../../badges/badgeUserAvatar";

interface IProps {
  sizeAvatar: number;
  source: string;
  status?: string;
  sizeBadge?: number;
  name: string;
}

const UserAvatar = ({
  sizeAvatar = 58,
  source,
  status = "",
  sizeBadge = 18,
  name = "",
}: IProps) => {
  // VARIABLES
  const nameShort = name ? getNameShort(name) : "";

  return (
    <div style={{ position: "relative" }}>
      <BadgeUserAvatar typeBadge={status} sizeBadge={sizeBadge}>
        {source ? (
          <Avatar
            src={`${process.env.REACT_APP_BASE_URL}/${source}`}
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
