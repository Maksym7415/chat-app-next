// STYLES
const classes = {
	wrapperInfoCenter: "flex-center-center text-center w-full h-full ",
};

const RenderInfoCenterBox = ({ children, styles }) => {
	return (
		<div
			className={classes.wrapperInfoCenter}
			style={styles}
		>
			{children}
		</div>
	);
};

export default RenderInfoCenterBox;
