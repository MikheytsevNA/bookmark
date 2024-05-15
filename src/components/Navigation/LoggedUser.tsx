import { Link } from "react-router-dom";
import book from "../../assets/icons8-bookmark-128.svg";
import { useContext } from "react";
import { ThemeContext } from "./Navigation";

export function LoggedUser() {
  const isDarkTheme = useContext(ThemeContext);
  return (
    <div
      className={`container-fluid container-fluid${isDarkTheme ? "-dark" : "-light"}`}
    >
      <Link to="/">
        <img src={book} id="book-logo" className="navbar-brand"></img>
      </Link>
      <ul className="navbar-nav flex-row">
        <li className="nav-item mx-1">
          <Link to="/favorites" className="nav-link">
            Избранное
          </Link>
        </li>
        <li className="nav-item mx-1">
          <Link to="/history" className="nav-link">
            История
          </Link>
        </li>
        <li className="nav-item mx-1">
          <Link to="/logout" className="nav-link">
            Выход
          </Link>
        </li>
      </ul>
    </div>
  );
}
