const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

// Connect Database
const connectDB = require("./config/connectDB");
connectDB();

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const list = require("./routers/journalRouter");
app.use("/api/v1/list", list);

// Lister
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
