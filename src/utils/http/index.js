import Endpoints from "./endpoints";
import { config } from "./../../config";
//import axios from "axios";

function parseHttpError(httpErr) {
  if (httpErr.response) return httpErr.response.data;
}

const processResponse = (response) => {
  if (response.status >= 200 && response.status <= 207) return response.json();
  else throw response;
};

const getBaseUrl = () => {
  return config.API_SERVER;
};

const getUserId = () => {
  const USER_ID = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).userId
    : "";

  return USER_ID;
};

export function login(payload) {
  return fetch(`${getBaseUrl()}${Endpoints.loginUser()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function fetchImprovementResource(payload) {
  payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.getImprovementResource()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function fetchStages(payload) {
  payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.getStages()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function fetchComments(payload) {
  payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.getComments()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function fetchGroupsets(payload) {
  payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.getGroupsets()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function fetchDashboard(payload) {
  payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.getDashboard()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}
