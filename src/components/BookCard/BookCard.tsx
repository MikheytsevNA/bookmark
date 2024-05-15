import { BookData } from "../../entities/BookData";
import heart from "../../assets/heart.svg";
import "./BookCard.css";
import { getLoginStatus } from "../../util/getLoginstatus";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { useThrottle } from "../../util/useTrottle";
import { useEffect, useState } from "react";

type BookCardProps = { item: BookData };

export function BookCard({ item }: BookCardProps) {
  const loggedInEmail = getLoginStatus();
  const [favStatus, setFavStatus] = useState(item.isInFavorites);

  const throttledClick = useThrottle(favStatus, 300);
  useEffect(() => {
    const favClickHandler = (favID: string) => {
      if (loggedInEmail) {
        RegistrationHandler.changeFavorites(loggedInEmail, favID);
      }
    };
    favClickHandler(item.id);
  }, [item.id, loggedInEmail, throttledClick]);
  return (
    <li className="book-card">
      <img src={item.images.small} alt={item.title} />
      <div>
        <b>{item.author}</b>
        <p>{item.title}</p>
      </div>
      <img
        src={heart}
        className={`bookmark-heart ${favStatus ? "bg-info" : ""}`}
        onClick={() => setFavStatus((state: boolean) => !state)}
      ></img>
    </li>
  );
}
