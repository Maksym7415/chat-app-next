import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import UserAvatar from "@/components/avatar/userAvatar";
import RenderConditionsList from "@/components/renders/renderConditionsList";
import { setStateDirection } from "@/helpers/index";
import { GetSearchContactsQuery } from "@/services/search/service";

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
  // HOOKS
  const dispatch = useDispatch();
  // SELECTORS
  const searchContacts = useSelector(
    (state) => state.searchSlice.searchContacts
  );

  const { isError, error, isLoading, data } = GetSearchContactsQuery({
    params: {
      searchRequest: searchContacts.search,
    },
  });

  // STATES
  const [contacts, setContacts] = useState([]);

  // FUNCTIONS
  const loadMore = useCallback(() => {
    if (
      searchContacts.limit &&
      searchContacts.response.length >= searchContacts.limit
    ) {
      const params = {
        search: searchContacts.search,
        offset: searchContacts.offset + searchContacts.limit,
      };

      // getSearchContactFetcher({
      //   params,
      //   direction: "down",
      // });
    }
    return false;
  }, []);

  useEffect(() => {
    setStateDirection({
      direction: searchContacts.direction || "",
      newData: searchContacts.response,
      setState: setContacts,
    });
  }, [searchContacts]);

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
            overscan={10}
            itemContent={(index, item) => {
              return (
                <div
                  // key={item.id}
                  className={classes.wrapperContact}
                  onClick={() => onClickContact(item)}
                >
                  <div className={classes.avatarView}>
                    <UserAvatar
                      source={item.userAvatar}
                      status={[1, 3].includes(index) ? "online" : ""}
                      name={item.fullName}
                      sizeAvatar={58}
                    />
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p className={classes.fullName}>{item.fullName}</p>
                    <p className={classes.login}>{item.login}</p>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SearchMain;
