import CircularProgress from "@mui/material/CircularProgress";

// STYLES
const classes = {
	container: "h-screen w-screen flex items-center justify-center",
};

const LoadingPage = () => (
	<div className={classes.container}>
		<div>
			<CircularProgress size={60} />
		</div>
	</div>
);

export default LoadingPage;
