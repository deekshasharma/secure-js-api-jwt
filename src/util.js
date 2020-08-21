let jwtDecode = require("jwt-decode");

export const updateAppSettings = (token) => {
  localStorage.clear();
  localStorage.setItem("displayName", jwtDecode(token)["sub"]);
  localStorage.setItem("token", token);
};
