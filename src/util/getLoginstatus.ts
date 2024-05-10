export function getLoginStatus() {
  return localStorage.getItem("loggedInEmail");
}
