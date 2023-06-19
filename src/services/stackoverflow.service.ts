import { UserModel } from "../models/user.model";

/* 
  This is the main service for the application. I was anticipating it getting larger.
  To keep components light, alot more logic can be moved here.
 */

export type Action =
  | { type: "following"; user_id: number; user: UserModel }
  | { type: "blocked"; user_id: number; user: UserModel }
  | { type: "added"; users: UserModel[] };

export const UsersReducer = (
  users: UserModel[],
  action: Action
): UserModel[] => {
  switch (action.type) {
    case "following":
    case "blocked":
      return users.map((user: UserModel) => {
        if (user.user_id === action?.user_id) {
          return action.user;
        } else {
          return user;
        }
      });
    case "added":
      return action.users;
    default:
      return users;
  }
};
