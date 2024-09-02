import {token} from "./getToken";

export const getHeaders = () => {
  const authToken = token();

  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};
