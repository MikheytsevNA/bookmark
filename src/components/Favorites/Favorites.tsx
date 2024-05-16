import { RegistrationHandler } from "../../entities/RegistrationManage";
import { getLoginStatus } from "../../util/getLoginstatus";
import Favorite from "./Favorite";

export function Favorites() {
  const email = getLoginStatus()!;
  const currentUser = RegistrationHandler.getRegisteredUsers()!.find(
    (user) => user.email === email,
  )!;

  return currentUser.favorites.length === 0 ? (
    <div>Empty</div>
  ) : (
    <ul className="list-group">
      {currentUser.favorites.map((item) => {
        return <Favorite item={item} key={item}></Favorite>;
      })}
    </ul>
  );
}
