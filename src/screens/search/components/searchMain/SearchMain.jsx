import { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import UserAvatar from "@/components/avatar/userAvatar";
import RenderConditionsList from "@/components/renders/renderConditionsList";

import { getSearchContactRequest } from "@/store/search/requests";
import { setStateDirection } from "@/helpers/index";

// need ts

const SearchMain = ({ onClickContact }) => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // SELECTORS
  const isLoading = useSelector(({ searchSlice }) => searchSlice.isLoading);
  const searchContacts = useSelector(
    ({ searchSlice }) => searchSlice.searchContacts
  );

  const [contacts, setContacts] = useState([]);
  const loadMore = useCallback(() => {
    if (
      searchContacts.limit &&
      searchContacts.response.length >= searchContacts.limit
    ) {
      const params = {
        search: searchContacts.search,
        offset: searchContacts.offset + searchContacts.limit,
      };

      dispatch(
        getSearchContactRequest({
          params,
          direction: "down",
        })
      );
    }
    return false;
  }, []);

  useEffect(() => {
    setStateDirection({
      direction: searchContacts.direction,
      newData: searchContacts.response,
      setState: setContacts,
    });
  }, [searchContacts.response]);

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
