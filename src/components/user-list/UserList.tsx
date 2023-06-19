import { FC } from "react";
import { UserModel } from "../../models/user.model";
import { UserItem } from "../user-item/UserItem";
import { useUsersContext } from "../users-provider/UsersProvider";
import "./UserList.scss";
import Skeleton from "../skeleton/Skeleton";

interface Props {
  loadMore: (pageSize: number) => void;
  hasMore: boolean;
  dataFetchingError: string | null;
}

const LoadMoreRecords = "Load More";
const MaxRecordsRecords = "Maximum Records Reached";

/* 
  This component also shows a skeleton version of the user list if an error passed down via props.
  The incrementing of users is also done here ia the laodmore button.
 */
export const UserList: FC<Props> = ({
  loadMore,
  hasMore,
  dataFetchingError,
}) => {
  const users = useUsersContext();

  const incrementUsers = (): void => {
    loadMore(20);
  };

  let userItems: JSX.Element[] = [];

  if (users) {
    userItems = users.map((user: UserModel) => (
      <UserItem key={user.user_id} user={user} />
    ));
  }

  return (
    <div className="user-list">
      {dataFetchingError ? (
        <>
          <Skeleton />
          <div className="user-list__error-message-container">
            <div className="user-list__error-message">{dataFetchingError}</div>
          </div>
        </>
      ) : (
        <>
          <ul className="user-list__wrapper">{userItems}</ul>
          <div className="user-list__total-container">
            <button
              disabled={!hasMore}
              onClick={incrementUsers}
              className="user-list__show-more user-list__show-more-item"
            >
              {hasMore ? LoadMoreRecords : MaxRecordsRecords}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
