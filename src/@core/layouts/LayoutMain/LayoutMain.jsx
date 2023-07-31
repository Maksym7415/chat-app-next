import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import LeftSide from "./components/leftSide";
import Meta from "@/core/seo/Meta";
import { socket } from "@/core/socket";
import {
	socketOnClearConversation,
	socketOnDeleteConversation,
	socketOnDeleteMessage,
	socketOnTypingStateId,
	socketOnUserIdChat,
	socketOnUserIdNewChat,
} from "@/core/socket/actions/socketOn";
import { userApi } from "@/store/user/api";

// STYLES
const classes = {
	container: "flex h-screen bg-[url('/images/generals/bgMain.avif')]",
};

const styleRnd = {
	position: "relative",
	borderRight: "1px solid rgba(0, 0, 0, 0.2)",
};

const LayoutMain = ({
	children,
	titlePage: titlePageProps = "",
	params = {},
}) => {
	// HOOKS
	const router = useRouter();
	const session = useSession();

	// SERVICES
	userApi.useGetUserProfileDataQuery();

	// SELECTORS
	const conversationsList = useSelector(
		({ conversationsSlice }) => conversationsSlice.conversationsList.data,
	);
	const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

	// STATES
	const [containerWidth, setContainerWidth] = useState(300);

	// VARIABLES
	const conversationsListMass = useMemo(
		() => Object.values(conversationsList),
		[conversationsList],
	);
	const conversationSelect = useMemo(
		() => (params?.id ? conversationsList[params?.id] || null : null),
		[params],
	);

	const titlePage = useMemo(() => {
		if (titlePageProps) {
			return titlePageProps;
		}

		if (params?.id) {
			if (conversationSelect?.conversationName) {
				return conversationSelect?.conversationName;
			}
			return "Chat";
		}

		return "";
	}, [params, titlePageProps, conversationSelect]);
	const descriptionPage = useMemo(() => {
		if (params?.id) {
			return "Chat with me";
		}

		return "";
	}, [params]);

	// USEEFFECTS
	useEffect(() => {
		if (session.data?.user?.id) {
			socket.removeAllListeners();
			if (conversationsListMass?.length) {
				conversationsListMass.forEach((chat) => {
					socketOnUserIdChat(chat);
					socketOnTypingStateId(chat);
				});
			}
			socketOnDeleteMessage();
			socketOnUserIdNewChat(userInfo?.id, router);
			socketOnDeleteConversation({
				params: {
					id: router.query.id,
				},
				router,
			});
			socketOnClearConversation();
		}
	}, [conversationsListMass]);

	return (
		<Meta
			title={titlePage}
			description={descriptionPage}
		>
			<main className={classes.container}>
				<Rnd
					style={styleRnd}
					minWidth="20vw"
					maxWidth="40vw"
					default={{
						x: 0,
						y: 0,
						width: containerWidth,
						height: "100%",
					}}
					onResize={(e, direction, ref) => {
						ref.offsetWidth < 200 && setContainerWidth(80);
					}}
					disableDragging
					enableResizing={{
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					}}
				>
					<LeftSide />
				</Rnd>
				{children}
			</main>
		</Meta>
	);
};

export default LayoutMain;
