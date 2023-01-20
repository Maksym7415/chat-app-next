// direction down | up | ""
// typeData mass | obj

export const setStateDirection = ({
  direction = "",
  typeData = "mass",
  newData = [],
  setState = () => {},
}) => {
  console.log(typeData, "typeData");
  console.log(direction, "direction");
  if (direction === "down") {
    console.log("___________down");
    if (typeData === "mass") {
      return setState((prev) => [...prev, ...newData]);
    }
    if (typeData === "obj") {
      return setState((prev) => ({ ...prev, ...newData }));
    }
  }

  if (direction === "up") {
    console.log("___________up");
    if (typeData === "mass") {
      return setState((prev) => [...newData, ...prev]);
    }
    if (typeData === "obj") {
      return setState((prev) => ({ ...newData, ...prev }));
    }
  }
  console.log("___________norm");
  return setState(newData);
};
