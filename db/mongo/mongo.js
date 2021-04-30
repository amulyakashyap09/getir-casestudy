const config = require("config");
const mongoose = require("mongoose");

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});
