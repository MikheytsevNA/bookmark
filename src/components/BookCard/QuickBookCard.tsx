import { BookData } from "../../entities/BookData";

type BookCardProps = { item: BookData };

export function QuickBookCard({ item }: BookCardProps) {
  return (
    <li className="d-flex flex-column">
      <div>
        <b>{item.author}</b>
        <p>{item.title}</p>
      </div>
    </li>
  );
}
