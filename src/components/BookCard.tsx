import { BookData } from "../entities/BookData";
import heart from "../assets/heart.svg";
import "./BookCard.css";

type BookCardProps = { item: BookData };

export function BookCard({ item }: BookCardProps) {
  return (
    <li className="book-card">
      <img src={item.images.small} alt={item.title} />
      <div>
        <b>{item.author}</b>
        <p>{item.title}</p>
      </div>
      <img src={heart} className="bookmark-heart"></img>
    </li>
  );
}
