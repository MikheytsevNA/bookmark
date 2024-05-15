import { useNavigate } from "react-router-dom";
import { BookData } from "../../entities/BookData";
import { getLoginStatus } from "../../util/getLoginstatus";
import { RegistrationHandler } from "../../entities/RegistrationManage";

type BookCardProps = { item: BookData };

export function QuickBookCard({ item }: BookCardProps) {
  const loggedInEmail = getLoginStatus();
  const navigate = useNavigate();
  return (
    <li
      className="d-flex flex-column my-1"
      role="button"
      onMouseDown={() => {
        RegistrationHandler.changeHistory(loggedInEmail!, `id:${item.id}`);
        navigate(`/books/${item.id}`);
      }}
    >
      <div>
        <b>{item.author}</b>
        <p>{item.title}</p>
      </div>
    </li>
  );
}
