import { useNavigate } from "react-router-dom";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { getLoginStatus } from "../../util/getLoginstatus";
import { useCallback } from "react";

export function History() {
  const navigate = useNavigate();
  const email = getLoginStatus()!;
  const currentUser = RegistrationHandler.getRegisteredUsers()!.find(
    (user) => user.email === email,
  )!;

  const memoClickHandler = useCallback(
    function clickHandler(item: string) {
      const firstPart = item.split(" - ")[0];
      if (firstPart.startsWith("id:")) {
        return navigate(`/books/${firstPart.slice(3)}`);
      }
      return navigate(`/search?q=${firstPart}&maxResults=10`);
    },
    [navigate],
  );

  return currentUser.history.length === 0 ? (
    <div>Empty</div>
  ) : (
    <ul className="list-group">
      {currentUser.history.map((item) => {
        return (
          <li
            key={item}
            className="list-group-item"
            role="button"
            onClick={() => {
              memoClickHandler(item);
            }}
          >
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
