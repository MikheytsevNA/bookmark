import { getLoginStatus } from "./getLoginstatus";
import { redirect } from "react-router-dom";

export async function logedOutLoader() {
  try {
    if (getLoginStatus() !== null) {
      throw Error("Доступно после выхода");
    }
  } catch (error) {
    return redirect("/");
  }
  return 0;
}
