import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import shallow from "zustand/shallow";
import UserAvatar from "@/components/avatar/userAvatar";
import RenderConditionsList from "@/components/renders/renderConditionsList";
import { setStateDirection } from "@/helpers/index";
import { useSearchStore } from "@/storeZustand/search/store";
import {
  SearchService,
  getSearchContactFetcher,
  useSearchContactFetcher,
} from "@/services/search/search.service";
import { useGetSearchContactsQuery } from "@/services/search/service";
import { useMemo } from "react";

// problem zustand update useEffect

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
  // SearchService.useGetUserConversations();
  // useSearchContactFetcher();

  // const searchContactsRedux = useSelector(
  //   (state) => state.searchSlice.searchContacts
  // );

  // STORE
  // const searchContacts = useSearchStore.getState().searchContacts;
  const searchContacts = useSearchStore((state) => state.searchContacts);
  const count = useSearchStore((state) => state.count);

  console.log("SearchMain");
  // const { isError, error, isLoading, data } = GetSearchContactsQuery({
  //   params: {
  //     searchRequest: searchContacts.search,
  //   },
  // });

  // console.log(searchContacts, 'searchContacts')

  // STATES
  const [contacts, setContacts] = useState([]);

  // FUNCTIONS
  const loadMore = useCallback(() => {
    // if (
    //   searchContacts.limit &&
    //   searchContacts.response.length >= searchContacts.limit
    // ) {
    //   const params = {
    //     search: searchContacts.search,
    //     offset: searchContacts.offset + searchContacts.limit,
    //   };

    //   // getSearchContactFetcher({
    //   //   params,
    //   //   direction: "down",
    //   // });
    // }
    return false;
  }, []);

  // const con = useMemo(
  //   (props) => {
  //     console.log(props, "--------------??useMemo");
  //     setStateDirection({
  //       direction: searchContacts.direction || "",
  //       newData: searchContacts.response,
  //       setState: setContacts,
  //     });
  //     return searchContacts.response;
  //   },
  //   [searchContacts.response]
  // );

  // USEEFFECTS
  // useEffect(() => {
  //   console.log("??USEEFFECTS");
  //   setStateDirection({
  //     direction: searchContacts?.direction || "",
  //     newData: searchContacts?.response || [],
  //     setState: setContacts,
  //   });
  // }, [searchContacts.response]);
  console.log(searchContacts, "searchContacts!!");
  // useEffect(() => {
  //   console.log("??count____");
  // }, [count]);
  // console.log(count, "count_____");

  useEffect(
    () =>
      useSearchStore.subscribe(
        (searchContacts) => {
          setStateDirection({
            direction: searchContacts?.direction || "",
            newData: searchContacts?.response || [],
            setState: setContacts,
          });
        },
        (store) => store.searchContacts
      ),
    []
  );

  // useEffect(() => {
  //   console.log("??USEEFFECTS");
  //   setStateDirection({
  //     direction: searchContactsRedux.direction || "",
  //     newData: searchContactsRedux.response,
  //     setState: setContacts,
  //   });
  // }, [searchContactsRedux]);

  // useEffect(() => {
  //   console.log("??USEEFFECTS 222");
  // }, [contacts]);

  // console.log(
  //   searchContacts.response?.length,
  //   "searchContacts.response?.length"
  // );
  // console.log(searchContacts, "searchContacts");
  // console.log(contacts, "contacts");
  // RENDER CONDITIONAL
  // if (!contacts.length || isLoading) {
  //   return (
  //     <RenderConditionsList
  //       list={contacts}
  //       isLoading={isLoading}
  //       isError={isError}
  //       errorMessage={error?.data?.message}
  //     />
  //   );
  // }

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
