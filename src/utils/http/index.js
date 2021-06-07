import { service } from "./fetch";
import Endpoints from "./endpoints";

function parseHttpError(httpErr) {
  if (httpErr.response) return httpErr.response.data;
}

const processResponse = (response) => {
  if (response.status >= 200 && response.status <= 207) return response;
  else throw response;
};

export function login() {
  return service()
    .get(Endpoints.loginUser())
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}
