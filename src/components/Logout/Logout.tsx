import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { logout } from "../../App/navBarSlice";
import { getLoginStatus } from "../../util/getLoginstatus";

export function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    navigate("/");
    const log = getLoginStatus();
    dispatch(logout(log));
  }, [navigate, dispatch]);
  return <div>Выходим...</div>;
}
