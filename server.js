const express = require("express");
const path = require("path");
const app = express();

app.get("/home", (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, private"
  );
  res.sendFile(path.join(__dirname, `./../DEMO/index.html`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*.js", (req, res, next) => {
  next();
});

app.get("/*", (req, res) => {
  console.log("req", __dirname);
  res.sendFile(path.join(__dirname, "build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, () => {
  console.log("req", __dirname);
  console.log("Server is running on port 3000\n");
});
