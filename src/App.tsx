import React from "react";
import "./App.scss";
import UsersProvider from "./components/users-provider/UsersProvider";
import Main from "./components/main/Main";
import Search from "./components/search/Search";

const App: React.FC = () => {
  return (
    <div className="app">
      <UsersProvider>
        <nav className="app__nav">
          <div className="app__nav-items">
            <a className="app__title" href="/">
              StackExchange
            </a>
            <Search />
          </div>
        </nav>
        <Main />
      </UsersProvider>
    </div>
  );
};

export default App;
