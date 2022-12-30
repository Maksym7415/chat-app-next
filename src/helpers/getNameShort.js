export const getNameShort = (name) => {
  if (typeof name !== "string") {
    return "";
  }

  const nameSplit = name.split(" ");
  const firstName = nameSplit?.[0]?.[0]?.toUpperCase() || "";
  const lastName = nameSplit?.[1]?.[0]?.toUpperCase() || "";

  return `${firstName}${lastName}`;
};
