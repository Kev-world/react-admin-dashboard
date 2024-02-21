export const storeToken = (tokenObject) => {
  localStorage.setItem("farmToken-admin", JSON.stringify(tokenObject));
};

export const getToken = () => {
  const tokenString = localStorage.getItem("farmToken-admin");
  if (!tokenString) return null;

  const tokenObject = JSON.parse(tokenString);
  return tokenObject?.token;
};

export const isTokenExpired = () => {
  const tokenString = localStorage.getItem("farmToken-admin");
  if (!tokenString) return true;

  const tokenObject = JSON.parse(tokenString);
  const now = new Date();

  // Assuming the expiry time is stored as a timestamp
  return now.getTime() > tokenObject.expiry;
};

export const clearToken = () => {
  localStorage.removeItem("farmToken-admin");
};
