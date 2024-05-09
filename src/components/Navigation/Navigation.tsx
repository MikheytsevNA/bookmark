import { useEffect, useState } from "react";
import book from "../../assets/icons8-bookmark-128.svg";
import "./Navigation.css";
import { Link, useLoaderData } from "react-router-dom";

export function Navigation() {
  const isLoggedIn = useLoaderData();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    async function updateToken() {
      const status = (await isLoggedIn) as string | null;
      setToken(status);
    }
    updateToken();
  }, [isLoggedIn]);
  console.log(token);
  return (
    <header>
      <nav className="navbar">
        {token ? (
          <div className="container-fluid">
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
        ) : (
          <div className="container-fluid">
            <Link to="/">
              <img src={book} id="book-logo" className="navbar-brand"></img>
            </Link>

            <ul className="navbar-nav flex-row">
              <li className="nav-item mx-1">
                <Link to="/login" className="nav-link">
                  Вход
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to="/signin" className="nav-link">
                  Регистрация
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
