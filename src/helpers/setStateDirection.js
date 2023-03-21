// direction down | up | ""
// typeData mass | obj

export const setStateDirection = ({
	direction = "",
	typeData = "mass",
	newData = [],
	setState = () => {},
}) => {
	if (direction === "down") {
		if (typeData === "mass") {
			return setState((prev) => [...prev, ...newData]);
		}
		if (typeData === "obj") {
			return setState((prev) => ({ ...prev, ...newData }));
		}
	}

	if (direction === "up") {
		if (typeData === "mass") {
			return setState((prev) => [...newData, ...prev]);
		}
		if (typeData === "obj") {
			return setState((prev) => ({ ...newData, ...prev }));
		}
	}

	return setState(newData);
};
