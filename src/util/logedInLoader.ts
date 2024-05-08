import { getLoginStatus } from "./getLoginstatus";
import { redirect } from "react-router-dom";

export async function logedInLoader() {
  try {
    if (getLoginStatus() === null) {
      throw Error("Доступно только Пользователям");
    }
  } catch (error) {
    return redirect("/");
  }
  return 0;
}
