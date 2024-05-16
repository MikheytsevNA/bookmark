import { BookData } from "../../entities/BookData";
import heart from "../../assets/heart.svg";
import "./BookCard.css";
import { getLoginStatus } from "../../util/getLoginstatus";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { useThrottle } from "../../util/useTrottle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BookCardProps = { item: BookData };

export function BookCard({ item }: BookCardProps) {
  const navigate = useNavigate();
  const loggedInEmail = getLoginStatus();
  const [favStatus, setFavStatus] = useState(item.isInFavorites);

  const throttledStatus = useThrottle(favStatus, 200);
  useEffect(() => {
    const favClickHandler = (favID: string) => {
      if (loggedInEmail) {
        RegistrationHandler.changeFavorites(loggedInEmail, favID);
      }
    };
    favClickHandler(item.id);
  }, [item.id, loggedInEmail, throttledStatus]);
  return (
    <li
      className="book-card"
      onClick={() => {
        RegistrationHandler.changeHistory(loggedInEmail!, `id:${item.id}`);
        navigate(`/books/${item.id}`);
      }}
    >
      <img src={item.images.small} alt={item.title} />
      <div>
        <b>{item.author}</b>
        <p>{item.title}</p>
      </div>
      <img
        src={heart}
        className={`bookmark-heart ${throttledStatus ? "bg-info" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          if (!loggedInEmail) {
            navigate("/login");
          } else {
            setFavStatus((state: boolean) => !state);
          }
        }}
      ></img>
    </li>
  );
}
