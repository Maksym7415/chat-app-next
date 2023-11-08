import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SDRoot, SDWContact, SDWInfo, SDFullName, SDLogin } from "./styles";
import SelectsAsyncPaginateSearch from "@/components/SelectsAsyncPaginateSearch";
import UserAvatar from "@/components/avatar/userAvatar/index";
import CustomButton from "@/components/buttons/customButton/index"; // replace
import { socketEmitChatCreation } from "@/core/socket/actions/socketEmit";
import { fullDate } from "@/helpers/index";
import Snackbar from "@/helpers/notistack";
import { allActionsStore } from "@/store/rootActions";
import { searchApi } from "@/store/search/api";
import { STATUS_AVATAR } from "@/constants/general";

// rework style

const NewChat = () => {
	// HOOKS
	const dispatch = useDispatch();
	const { t } = useTranslation("common");

	// SELECTORS
	const authToken = useSelector(({ authSlice }) => authSlice.authToken);

	// STATES
	const [selectedContacts, setSelectedContacts] = useState([]);

	// FUNCTIONS
	const createChat = () => {
		if (!selectedContacts.length) {
			return Snackbar.error("No selected contacts");
		}

		const data = [
			...selectedContacts.map((item) => ({
				id: item.id,
				firstName: item.firstName,
			})),
			{
				id: authToken.userId,
				firstName: authToken.firstName,
				isAdmin: true,
			},
		];

		return socketEmitChatCreation({
			data,
			date: fullDate(new Date()),
			chatName: "Chat",
			imageData: {},
			imageFormat: "",
			cb: () => {
				dispatch(allActionsStore.setDialogWindowClearConfigAction());
				return Snackbar.success(t("generals.createdNewChat"));
			},
		});
	};

	return (
		<SDRoot>
			<SelectsAsyncPaginateSearch
				setSelected={(selected) => {
					setSelectedContacts(selected);
				}}
				selected={selectedContacts}
				settings={{
					isMulti: true,
					getSearchRequest: async (searchQuery, page) => {
						const params = {};

						const searchParams = searchQuery || "";
						const offsetParams = page !== 1 ? (page - 1) * 10 : 0;

						if (searchParams) {
							params.searchRequest = searchParams;
						}
						if (offsetParams) {
							params.offset = offsetParams;
						}

						let response = {
							data: {
								response: [],
								limit: 0,
							},
						};

						try {
							response = await dispatch(
								searchApi.endpoints.getSearchContacts.initiate({
									params,
								}),
							);
						} catch (error) {
							console.dir(error, "getSearchRequest");
						}
						return {
							options: response?.data?.response || [],
							limit: response?.data?.limit || 0,
						};
					},
					getOptionValue: (option) => option.id,
					getOptionLabel: (option) => (
						<SDWContact
							component="li"
							key={option.id}
						>
							<Box>
								<UserAvatar
									source={option.userAvatar}
									status={
										[1, 3].includes(option.id)
											? STATUS_AVATAR.online
											: ""
									}
									name={option.fullName}
									sizeAvatar={38}
								/>
							</Box>
							<SDWInfo>
								<SDFullName>{option.fullName}</SDFullName>
								<SDLogin>{option.login}</SDLogin>
							</SDWInfo>
						</SDWContact>
					),
				}}
				placeholder={t("generals.selectContact")}
				styles={{
					root: {
						marginLeft: 15,
						paddingBottom: 10,
					},
				}}
			/>
			<CustomButton
				onClick={createChat}
				style={{
					margin: "10px auto 0",
					width: "100%",
					maxWidth: "200px",
				}}
			>
				{t("generals.createAChat")}
			</CustomButton>
		</SDRoot>
	);
};

export default NewChat;
