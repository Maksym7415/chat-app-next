import React from "react";

interface IProps {
  name: string;
  width: string;
  height: string;
  fontSize?: string;
  isSquare?: boolean;
}

const lettersStyle = {
  fontWeight: 700,
  color: "#ffffff",
};

const DefaultAvatar = ({
  name = "Chat",
  width,
  height,
  fontSize,
  isSquare,
}: IProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#48b7db",
        borderRadius: isSquare ? 0 : "50%",
        width,
        height,
        flexShrink: 0,
      }}
    >
      <span style={{ ...lettersStyle, fontSize }}>{name}</span>
    </div>
  );
};

export default DefaultAvatar;
