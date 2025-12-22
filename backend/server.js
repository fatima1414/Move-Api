const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profile", express.static("uploads"));

const movieRoute = require("./routes/movieRoute");
app.use("/api", movieRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
