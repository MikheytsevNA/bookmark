/* eslint-disable react-refresh/only-export-components */
import { getLoginStatus } from "../../util/getLoginstatus";
import { redirect } from "react-router-dom";

export function Component() {
  return <div> log in form</div>;
}

export async function loader() {
  try {
    if (getLoginStatus() !== null) {
      throw Error("Доступно после выхода");
    }
  } catch (error) {
    return redirect("/");
  }
  return 0;
}
