const config = require("config");
const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
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
