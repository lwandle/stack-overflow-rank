import { FC } from "react";
import { useUsersDispatch } from "../users-provider/UsersProvider";
import "./Search.scss";
import { getStoredStackOverflowResponse } from "../../services/utils";
import { UserModel } from "../../models/user.model";

const Search: FC = () => {
  const userDispatch = useUsersDispatch();

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    let updatedList: UserModel[] = getStoredStackOverflowResponse().items;
    const searchQuery = e.currentTarget.value;

    updatedList = updatedList.filter((user: UserModel) => {
      return (
        user.display_name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
        -1
      );
    });

    userDispatch({
      type: "added",
      users: updatedList,
    });
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search"
        onChange={(e) => filterUsers(e)}
      />
    </form>
  );
};

export default Search;
