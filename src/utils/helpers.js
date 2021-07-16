export function getQueryParamByName(
  name,
  query = window.location.search.slice(1)
) {
  const queryObj = query.split("&").reduce((a, b) => {
    if (b.split("=")[1] === "true" || b.split("=")[1] === "false") {
      a[b.split("=")[0]] = JSON.parse(b.split("=")[1]);
    } else {
      a[b.split("=")[0]] = decodeURIComponent(b.split("=")[1]);
    }
    return a;
  }, {});

  return queryObj[name];
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
