const dbConnect = require("./config/dbConnect");
const express = require("express");
const morgan = require("morgan");

const path = require("path");
const { createWriteStream } = require("fs");

const logFs = createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const menuItemsRoutes = require("./routes/menuItemRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5500;

const app = express();

dbConnect();

app.use(morgan("combined", { stream: logFs }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/menu-items", menuItemsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and listening on PORT ${PORT}...`);
});
