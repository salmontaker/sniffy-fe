let accessToken = null;
let logoutCallback = null;

const tokenManager = {
  getToken: () => {
    return accessToken;
  },
  setToken: (token) => {
    accessToken = token;
  },
  setLogoutCallback: (callback) => {
    logoutCallback = callback;
  },
  isRefreshRequired: () => {
    return document.cookie.split(";").some((cookie) => cookie.trim().startsWith("login="));
  },
  logout: () => {
    accessToken = null;
    document.cookie = "login=; path=/; max-age=0";

    if (logoutCallback) {
      logoutCallback();
    }
  }
};

export default tokenManager;
