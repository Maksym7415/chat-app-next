import React from "react";
import { Provider } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import ContextMenu from "@/components/contextMenu";
import DialogCustom from "@/components/dialogWindow/Dialog";
import DrawerCustom from "@/components/drawer";
import ModalCustom from "@/components/modal";
import { namesCookies } from "@/core/constants/general";
import { PATHS } from "@/core/constants/paths";
import Providers from "@/providers/MainProvider";
import { wrapper } from "@/store/store";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, ...rest }) => {
	const { pageProps } = rest;

	const { store } = wrapper.useWrappedStore(rest);

	return (
		<>
			<Provider store={store}>
				<Providers Component={Component}>
					<DrawerCustom />
					<ContextMenu />
					<ModalCustom />
					<DialogCustom />
					<Component {...pageProps} />
				</Providers>
			</Provider>
		</>
	);
};

MyApp.getInitialProps = async ({ ctx }) => {
	const token = ctx.res?.req?.cookies?.[namesCookies.accessToken];

	if (!token) {
		if (
			![PATHS.signIn, PATHS.signUp, PATHS.verification].includes(
				ctx.asPath,
			)
		) {
			ctx.res?.writeHead(302, { Location: PATHS.signIn });
			ctx.res?.end();
			return {};
		}
	} else {
		if (
			[PATHS.signIn, PATHS.verification, PATHS.signUp].includes(
				ctx.asPath,
			)
		) {
			ctx.res?.writeHead(302, { Location: PATHS.main });
			ctx.res?.end();
		}
	}

	return {};
};

export default MyApp;
