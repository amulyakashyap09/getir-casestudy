const config = require("config");
const mongoose = require("mongoose");

mongoose.set("debug", true);

const connect = (
  uri = config.db.uri,
  options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
) => {
  mongoose
    .connect(uri, options)
    .then(() => {
      return {
        code: 200,
        message: "MongoDB Connected.",
      };
    })
    .catch((e) => {
      return e.message || e.stack;
    });
};

const disconnect = () => {
  mongoose.disconnect();
};

module.exports = { connect, disconnect };

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});
