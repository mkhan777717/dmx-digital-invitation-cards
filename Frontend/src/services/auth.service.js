import api from "./api";

const USER_KEY = "premier_invites_user";

export const authService = {
  async register(userName, email, password) {
    const response = await api.post("/register", { userName, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post("/login", { email, password });
    // Since token is stored in httpOnly cookie, backend doesn't return the token.
    // It returns { message: "User logged in" }.
    // We will store mock or minimal user state in localStorage based on email for UI purposes.
    // This allows recovery of username and email across refresh.
    const user = {
      email,
      userName: email.split("@")[0], // Fallback username if none is found
    };
    
    // We fetch user details if needed, but since we don't have /me, we save this info.
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return response.data;
  },

  async logout() {
    const response = await api.post("/logout");
    localStorage.removeItem(USER_KEY);
    return response.data;
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }
};
