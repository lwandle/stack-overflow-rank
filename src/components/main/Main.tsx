import React, { useEffect, useState } from "react";
import axios from "axios";
import { StackexchangeResponse } from "../../models/user.model";
import { useUsersDispatch } from "../users-provider/UsersProvider";
import { UserList } from "../user-list/UserList";
import "./Main.scss";
import {
  cacheStackOverflowResponse,
  getPageSizeCache,
  getStoredStackOverflowResponse,
} from "../../services/utils";

const Main: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(20);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [dataFetchingError, setDataFetchingError] = useState<string | null>(
    null
  );
  const dispatch = useUsersDispatch();

  /* 
      The Local Caching strategy is implemeted here.
      StackOverflow users are stored in localstorage on the initial API call and then subsequently then after if the pageSize is changed on the loadmore button.
      Pagesize is essentially used as an ID to trigger API calls.
      This lifecyle hook is too busy and tedius, code can be futher broken down into smaller functions.
   */
  useEffect(() => {
    const storedStackExchangeResponse = getStoredStackOverflowResponse();
    const pageSizeCache = getPageSizeCache();
    async function startFetching(): Promise<void> {
      try {
        const { data } = await axios.get<StackexchangeResponse>(
          `https://api.stackexchange.com/2.2/users?pagesize=${pageSize}&order=desc&sort=reputation&site=stackoverflow`
        );
        dispatch({ type: "added", users: data.items });
        setHasMore(data.has_more);
        cacheStackOverflowResponse(data, pageSize);
      } catch (error) {
        setDataFetchingError(`There was an error the fetching users, ${error}`);
      }
    }
    if (pageSizeCache !== pageSize) {
      startFetching();
    } else {
      dispatch({ type: "added", users: storedStackExchangeResponse.items });
      setHasMore(storedStackExchangeResponse.has_more);
    }
  }, [dispatch, pageSize]);

  const incrementPageSize = (pageIncrement: number) => {
    setPageSize(pageSize + pageIncrement);
  };

  return (
    <div className="users-container">
      <UserList
        loadMore={incrementPageSize}
        hasMore={hasMore}
        dataFetchingError={dataFetchingError}
      />
    </div>
  );
};

export default Main;
