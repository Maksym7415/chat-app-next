"use client";

import { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import shallow from "zustand/shallow";
import UserAvatar from "@/components/avatar/userAvatar";
import RenderConditionsList from "@/components/renders/renderConditionsList";
import { setStateDirection } from "@/helpers/index";
import { useSearchStore } from "@/storeZustand/search/store";

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

const SearchMain = ({ onClickContact }) => {
  // HOOKS

  const { isLoading, searchContacts, getSearchContactRequest } = useSearchStore(
    (state) => ({
      searchContacts: state.searchContacts,
      isLoading: state.isLoading,
      getSearchContactRequest: state.getSearchContactRequest,
    }),
    shallow
  );

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

      getSearchContactRequest({
        params,
        direction: "down",
      });
    }
    return false;
  }, []);

  // USEEFFECTS
  useEffect(() => {
    setStateDirection({
      direction: searchContacts.direction,
      newData: searchContacts.response,
      setState: setContacts,
    });
  }, [searchContacts.response]);

  console.log(searchContacts, "searchContacts");
  // RENDER CONDITIONAL
  if (!contacts.length || isLoading) {
    return <RenderConditionsList list={contacts} isLoading={isLoading} />;
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
