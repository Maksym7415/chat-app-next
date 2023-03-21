import { CircularProgress } from "@mui/material";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import UserAvatar from "@/components/avatar/userAvatar";
import RenderConditionsList from "@/components/renders/renderConditionsList";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import { handleKeyDown, setStateDirection } from "@/helpers/index";
import { allActionsStore } from "@/store/rootActions";
import { searchApi } from "@/store/search/api";

// STYLES
const classes = {
	container: "h-full bg-white",
	wrapperContacts: "p-[5px] h-full",
	wrapperContact:
		"flex px-[10px] py-[5px] rounded-[20px] cursor-pointer hover:bg-[#dfe7f4]",
	wrapperInfo: "pl-[20px] overflow-hidden",
	fullName: "text-[16px] m-0 line-clamp-1",
	login: "m-[0px] mt-[3px] text-[12px] line-clamp-1",
	avatarView: "",
};

// fix load more data

const SearchMain = ({ onClickContact }) => {
	const dispatch = useDispatch();

	// SELECTORS
	const searchContactsParams = useSelector(
		(state) => state.searchSlice.searchContactsParams,
	);

	// STATES
	const [contacts, setContacts] = useState([]);

	// VARIABLES
	const params = useMemo(() => {
		const paramsLoc = {};
		const searchRequest = searchContactsParams.search;
		const { offset } = searchContactsParams;

		if (searchRequest) {
			paramsLoc.searchRequest = searchRequest;
		}
		if (offset) {
			paramsLoc.offset = offset;
		}

		return paramsLoc;
	}, [searchContactsParams]);

	// SERVICES
	const { currentData, isError, error, isLoading } =
		searchApi.useGetSearchContactsQuery({
			params,
		});

	// FUNCTIONS
	const loadMore = useCallback(() => {
		if (
			currentData?.response?.length >= searchContactsParams.limit &&
			!isLoading &&
			!isError
		) {
			dispatch(
				allActionsStore.setSearchContactsAction({
					offset:
						searchContactsParams.offset +
						searchContactsParams.limit,
					direction: "down",
				}),
			);
		}
		return false;
	}, [searchContactsParams, currentData]);

	useLayoutEffect(() => {
		setStateDirection({
			direction: searchContactsParams.direction || "",
			newData: currentData?.response || [],
			setState: setContacts,
		});

		dispatch(
			allActionsStore.setSearchContactsAction({
				limit: currentData?.limit || 0,
			}),
		);
	}, [currentData]);

	useEffect(
		() => () => {
			dispatch(allActionsStore.resetSearchContactsAction());
		},
		[],
	);

	// RENDER CONDITIONAL
	if (!contacts.length || isLoading) {
		return (
			<RenderConditionsList
				list={contacts}
				isLoading={isLoading}
				isError={isError}
				errorMessage={error?.data?.message}
			/>
		);
	}

	return (
		<>
			<div className={classes.container}>
				<div className={classes.wrapperContacts}>
					<Virtuoso
						style={{ height: "100%" }}
						data={contacts}
						endReached={loadMore}
						overscan={2}
						components={{
							Footer: () =>
								isLoading ? (
									<RenderInfoCenterBox
										styles={{ padding: "5px 0" }}
									>
										<CircularProgress size={30} />
									</RenderInfoCenterBox>
								) : (
									<></>
								),
						}}
						itemContent={(index, item) => (
							<div
								key={item?.id}
								role="button"
								tabIndex="0"
								className={classes.wrapperContact}
								onClick={() => onClickContact(item)}
								onKeyDown={(event) =>
									// eslint-disable-next-line @typescript-eslint/no-empty-function
									handleKeyDown({ event, fcClick: () => {} })
								}
							>
								<div className={classes.avatarView}>
									<UserAvatar
										source={item.userAvatar}
										status={
											[1, 3].includes(index)
												? "online"
												: ""
										}
										name={item.fullName}
										sizeAvatar={58}
									/>
								</div>
								<div className={classes.wrapperInfo}>
									<p className={classes.fullName}>
										{item.fullName}
									</p>
									<p className={classes.login}>
										{item.login}
									</p>
								</div>
							</div>
						)}
					/>
				</div>
			</div>
		</>
	);
};

export default SearchMain;
