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
  static changeFavorites(email: string, favID: string) {
    if (!favID) {
      return;
    }
    const registrationObj = RegistrationHandler.getRegisteredUsers();
    if (!registrationObj) {
      return;
    }
    const currentUser = registrationObj.find((user) => user.email === email)!;
    const favIndex = currentUser.favorites.indexOf(favID);
    if (favIndex === -1) {
      currentUser?.favorites.push(favID);
    } else {
      currentUser?.favorites.splice(favIndex, 1);
    }
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(
        registrationObj.map((user) => {
          if (user.email === email) {
            user.favorites = currentUser.favorites;
          }
          return user;
        }),
      ),
    );
  }

  static changeHistory(email: string, query: string) {
    if (!query) {
      return;
    }
    const registrationObj = RegistrationHandler.getRegisteredUsers();
    if (!registrationObj) {
      return;
    }
    const currentUser = registrationObj.find((user) => user.email === email)!;
    const favIndex = currentUser.history.indexOf(query);
    if (favIndex === -1) {
      currentUser?.history.push(query);
    }
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(
        registrationObj.map((user) => {
          if (user.email === email) {
            user.history = currentUser.history;
          }
          return user;
        }),
      ),
    );
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
