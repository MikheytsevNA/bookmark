import "./Navigation.css";
import { useAppSelector } from "../../App/hooks";
import { createContext, useState } from "react";
import { LoggedUser } from "./LoggedUser";
import { NotLoggedUser } from "./NotLoggedUser";

export const ThemeContext = createContext(false);

export function Navigation() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const loggedInEmail = useAppSelector((state) => state.navbar.value);
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
            Switch theme
          </button>
        </nav>
      </ThemeContext.Provider>
    </header>
  );
}
