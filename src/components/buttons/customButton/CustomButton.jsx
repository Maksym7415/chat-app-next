// STYLES
const classes = {
	root: "font-bold px-[24px] py-[12px] bg-[#007FFF] rounded-[12px] text-white transition-all ease-linear duration-150 cursor-pointer border-none hover:bg-[#0072e5] disabled:opacity-50 disabled:cursor-not-allowed",
};

const CustomButton = ({ children, onClick, style, ...rest }) => (
	<button
		onClick={onClick}
		className={classes.root}
		style={style}
		{...rest}
	>
		{children}
	</button>
);

export default CustomButton;
