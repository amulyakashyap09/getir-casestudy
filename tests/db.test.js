const config = require("config");
const mongoose = require("mongoose");

describe("mongodb connection", async () => {
  it("should connect to mongodb successfully", async () => {
    const url = config.db.uri;
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    const resp = await mongoose.connect(url, options);
    expect(resp.connection.readyState).toBe(1);
  });

  it("should disconnect mongodb successfully", async () => {
    const resp = await mongoose.disconnect();
    expect(resp).toBeUndefined();
  });
});
