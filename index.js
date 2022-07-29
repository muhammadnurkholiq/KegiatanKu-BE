// dotenv
require("dotenv").config();
// express
const express = require("express");
// cors
const cors = require("cors");
// router
const router = require("./src/routes");

// config
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server Kegiatanku is Running");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
