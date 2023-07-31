import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { appWithTranslation } from "next-i18next";
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
import { authOptions } from "./api/auth/[...nextauth]";
import Providers from "@/providers/MainProvider";
import { store } from "@/store/store";
import { useIsMounted } from "@/hooks/use-ref/useIsMounted";
import { allActionsStore } from "@/store/rootActions";
import LayoutMain from "@/core/layouts/LayoutMain";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const App = ({ Component, ...rest }) => {
	const isMounted = useIsMounted()?.current;

	const { pageProps } = rest;

	if (!isMounted) {
		store.dispatch(
			allActionsStore.setUserInfoAction(pageProps.session?.user || {}),
		);

		store.dispatch(
			allActionsStore.setConversationListAction(
				pageProps.dataUserConversations || {},
			),
		);
	}

	const getLayout =
		Component.getLayout ??
		((page) => <LayoutMain titlePage={pageProps?.titlePage || ""}>{page}</LayoutMain>);

	return (
		<>
			<Provider store={store}>
				<SessionProvider session={pageProps.session}>
					<Providers Component={Component}>
						<DrawerCustom />
						<ContextMenu />
						<ModalCustom />
						<DialogCustom />
							{getLayout(<Component {...pageProps} />)}
					</Providers>
				</SessionProvider>
			</Provider>
		</>
	);
};

App.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const locale = ctx?.locale;
	const req = ctx?.req;

	return {
		pageProps: {
			...pageProps,
			locale,
			session: await getServerSession(req, ctx.res, authOptions),
		},
	};
};

export default appWithTranslation(App);
