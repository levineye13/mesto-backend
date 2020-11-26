const express = require("express");

const { PORT = 3000 } = process.env;

const app = express();

//app.get("/users", (req, res) => {});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Port " + PORT);
});
