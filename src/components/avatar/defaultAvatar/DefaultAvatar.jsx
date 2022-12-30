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
}) => {
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
