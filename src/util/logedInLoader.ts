import { getLoginStatus } from "./getLoginstatus";
import { redirect } from "react-router-dom";

export async function logedInLoader() {
  try {
    const response = await getLoginStatus();
    if (response === null) {
      throw Error("Доступно только Пользователям");
    }
  } catch (error) {
    return redirect("/");
  }
  return 0;
}
