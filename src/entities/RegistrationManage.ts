type User = {
  email: string;
  password: string;
  favorites: string[];
  history: string[];
};

export class RegistrationHandler {
  static getRegisteredUsers(): User[] | null {
    const registrationObj = JSON.parse(
      localStorage.getItem("registeredUsers")!,
    );
    if (!registrationObj) {
      return null;
    }
    return registrationObj;
  }
  constructor(user: User) {
    const registrationObj = localStorage.getItem("registeredUsers");
    if (registrationObj) {
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify([...JSON.parse(registrationObj), user]),
      );
    } else {
      localStorage.setItem("registeredUsers", JSON.stringify([user]));
    }
  }
}
