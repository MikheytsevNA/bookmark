import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { logout } from "../../App/store";

export function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    navigate("/");
    localStorage.removeItem("loggedInEmail");
    dispatch(logout());
  }, [navigate, dispatch]);
  return <div>Выходим...</div>;
}
