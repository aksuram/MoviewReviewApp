import jwt_decode from "jwt-decode";
import { API_URL } from "./settings";

//Returns current token or null if no token or current one has expired
export async function getToken() {
  if (window.localStorage.getItem("token")) {
    if (
      new Date().getTime() / 1000 >
      window.localStorage.getItem("expirationTime")
    ) {
      return null;
    } else {
      return window.localStorage.getItem("token");
    }
  } else {
    return null;
  }
}

async function getTokenFromApi(username, password, handleState) {
  const formData = {
    username: username,
    password: password,
  };

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 200) {
    let responseBody = await response.json();

    window.localStorage.setItem("token", responseBody.token);
    window.localStorage.setItem("id", jwt_decode(responseBody.token).id);
    window.localStorage.setItem(
      "username",
      jwt_decode(responseBody.token).user
    );
    window.localStorage.setItem("role", jwt_decode(responseBody.token).role);
    window.localStorage.setItem(
      "expirationTime",
      jwt_decode(responseBody.token).exp
    );

    return response.status;
  } else {
    if (response.status === 401) {
      handleState("Incorrect username and/or password");
    } else if (response.status === 500) {
      handleState("Error: Unknown exception occured");
    }
    logoutUser();
    return response.status;
  }
}

export async function loginUser(username, password, handleState) {
  let result = await getTokenFromApi(username, password, handleState);
  return result;
}

export function logoutUser() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("id");
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("expirationTime");
}

export function getUserRole() {
  if (window.localStorage.getItem("token")) {
    if (window.localStorage.getItem("role") === "a") {
      return "a";
    } else {
      return "u";
    }
  } else {
    return null;
  }
}
