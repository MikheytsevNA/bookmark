import { RegistrationHandler } from "../entities/RegistrationManage";
import { getLoginStatus } from "./getLoginstatus";

export function checkIfFavorite(id: string) {
  const registrationObj = RegistrationHandler.getRegisteredUsers();
  if (!registrationObj) {
    return false;
  }

  const user = registrationObj.find(
    (user: { favorites: string[]; email: string }) =>
      user.email === getLoginStatus(),
  );
  const isInFavorites = user ? user.favorites.includes(id) : false;

  return isInFavorites;
}
