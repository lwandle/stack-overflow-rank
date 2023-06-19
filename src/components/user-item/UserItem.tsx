import React, { useState } from "react";
import { UserModel } from "../../models/user.model";
import "./UserItem.scss";
import { useUsersDispatch } from "../users-provider/UsersProvider";

export interface Props {
  user: UserModel;
}

const follow: string = "follow";
const unfollow: string = "unfollow";
const block: string = "block";
const blockedText: string = "Blocked";
const unblock: string = "unblock";
const followingIndicatorText: string = "Following";

/* 
  This is the basic building block of the user list.
  Contains the detailed view with 2 buttons to block and follow a user and vice versa.
  Indicators also show the currect status of an item in relation to the user.
  Recieves the clicked user a prop.
 */
export const UserItem: React.FC<Props> = ({ user }) => {
  const [showDetailView, setShowDetailView] = useState<boolean>(false);
  const dispactUsers = useUsersDispatch();

  const following = (following: boolean): void => {
    dispactUsers({
      user: { ...user, following: following },
      type: "following",
      user_id: user.user_id,
    });
  };

  const blocked = (blocked: boolean): void => {
    dispactUsers({
      user: { ...user, blocked: blocked, following: false },
      type: "blocked",
      user_id: user.user_id,
    });
  };

  const followingIndicator = (
    <div className="user-item__following-indicator">
      {followingIndicatorText}
    </div>
  );

  const blockedIndicator = (
    <div className="user-item__blocked-indicator">{blockedText}</div>
  );

  return (
    <>
      <li
        id={`${user.user_id}`}
        onClick={() => setShowDetailView(!showDetailView)}
        className={`user-item ${user.blocked && "user-item--blocked"}`}
      >
        <div className="user-item--container">
          <div className="user-item--profile-wrapper">
            <img
              className="user-item__profile-image user-item__item"
              src={user.profile_image}
              alt={user.display_name?.charAt(0).toUpperCase()}
            />
            <span className="user-item__display-name user-item__item">
              {user.display_name?.toUpperCase()}
            </span>
            <>{user.following && followingIndicator}</>
            <>{user.blocked && blockedIndicator}</>
          </div>
          <div>
            <span className="user-item__reputation user-item__item">
              {user.reputation}
            </span>
            <span className="user-item__chevron user-item__item">{">"}</span>
          </div>
        </div>
        {showDetailView && (
          <div className="user-item__actions">
            <button
              disabled={user.blocked}
              onClick={() => following(!user.following)}
              className="user-item__action"
            >
              {user.following ? unfollow : follow}
            </button>
            <button
              onClick={() => blocked(!user.blocked)}
              className="user-item__action"
            >
              {user.blocked ? unblock : block}
            </button>
          </div>
        )}
      </li>
      <hr className="user-item__separator" />
    </>
  );
};
