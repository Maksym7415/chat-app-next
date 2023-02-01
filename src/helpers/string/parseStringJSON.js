export const parseStringJSON = (str) => {
  console.log(str, "str");
  if (typeof str === "string") {
    return JSON.parse(str);
  }
  return str;
};
