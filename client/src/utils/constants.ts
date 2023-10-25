export const apiUrl =
  process.env.ENV === "development"
    ? "http://localhost:3001"
    : process.env.API_URL;

export const colors = ["red", "blue", "cyan", "yellow", "violet"];
