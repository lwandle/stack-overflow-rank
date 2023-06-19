import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { Action, UsersReducer } from "../../services/stackoverflow.service";
import { UserModel } from "../../models/user.model";

interface Props {
  children: ReactNode;
}

const UsersContext = createContext<UserModel[]>([]);
const UsersDispatchContext = createContext<React.Dispatch<any>>(() => null);

export const useUsersContext = (): UserModel[] => {
  return useContext(UsersContext);
};

export const useUsersDispatch = (): React.Dispatch<Action> => {
  return useContext(UsersDispatchContext);
};

const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, dispatch] = useReducer(UsersReducer, []);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};

export default UsersProvider;
