const path = require("path");
const express = require("express");
const app = express();

// routes
require("./startup/config")();
require("./startup/dbInit")();
require("./startup/logging")();
require("./services/scheduler")();
require("./startup/routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// PORT setting
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
