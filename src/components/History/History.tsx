import { useNavigate } from "react-router-dom";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { getLoginStatus } from "../../util/getLoginstatus";

export function History() {
  const navigate = useNavigate();
  const email = getLoginStatus()!;
  const currentUser = RegistrationHandler.getRegisteredUsers()!.find(
    (user) => user.email === email,
  )!;

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
              navigate(`/search?q=${item}&maxResults=10`);
            }}
          >
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
