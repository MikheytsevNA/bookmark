import "./Navigation.css";
import { getLoginState } from "../../App/navBarSlice";
import { createContext, useState } from "react";
import { LoggedUser } from "./LoggedUser";
import { NotLoggedUser } from "./NotLoggedUser";
import { useAppSelector } from "../../App/hooks";

export const ThemeContext = createContext(false);

export function Navigation() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const loggedInEmail = useAppSelector((state) =>
    getLoginState({ navbarLogIn: state.navbar }),
  );
  return (
    <header>
      <ThemeContext.Provider value={isDarkTheme}>
        <nav className="navbar">
          {loggedInEmail ? <LoggedUser /> : <NotLoggedUser />}
          <button
            className="btn btn-outline-secondary mx-2 rounded theme-switch"
            onClick={() => {
              setIsDarkTheme((state: boolean) => !state);
            }}
          >
            Сменить тему
          </button>
        </nav>
      </ThemeContext.Provider>
    </header>
  );
}
