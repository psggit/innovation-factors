/* eslint-disable no-useless-escape */
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
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );

  console.log("hello", matches, name, document.cookie);
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// export const getCookie = (name) => {
//   var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
//   console.log("hello", v, name, document.cookie);
//   return v ? v[2] : null;
// };
