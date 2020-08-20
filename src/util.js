export const addAppSettings = (username, role) => {
  localStorage.clear();
  localStorage.setItem("displayName", username);
  localStorage.setItem("role", role);
};