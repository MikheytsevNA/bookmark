import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  navigate("/");
  localStorage.removeItem("loggedInEmail");
  return <div>Выходим...</div>;
}
