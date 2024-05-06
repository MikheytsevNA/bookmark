import { BookData } from "../entities/BookData";
import "./BookCard.css";

type BookCardProps = { item: BookData };

export function BookCard({ item }: BookCardProps) {
  return (
    <li className="book-card">
      <img src={item.images.small} alt={item.title} />
      <p>
        <b>{item.author}: </b>
        {item.title}
      </p>
    </li>
  );
}
