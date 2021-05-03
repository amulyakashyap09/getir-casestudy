const request = require("supertest");
const app = require("../app");

describe("API Endpoint tests", () => {
  it("should show welcome json", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("should show records from the collection", async () => {
    const res = await request(app).get("/records?skip=0&limit=100");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("records");
    expect(res.body.records[0]).toHaveProperty(
      "_id",
      "key",
      "createdAt",
      "counts"
    );
  });

  it("should give BadRequest 400 error", async () => {
    const res = await request(app).post("/filter-records").send({
      endDate: "2021-02-02",
      minCount: 100,
      maxCount: 1000,
    });
    expect(res.statusCode).toEqual(400);
  });

  it("should give endDate is required error", async () => {
    const res = await request(app).post("/filter-records").send({
      startDate: "2021-02-02",
      minCount: 100,
      maxCount: 1000,
    });
    expect(res.body).toMatchObject({
      error: '"endDate" is required',
    });
  });

  it("should filter and show records from the collection", async () => {
    const res = await request(app).post("/filter-records").send({
      startDate: "2000-01-26",
      endDate: "2021-02-02",
      minCount: 100,
      maxCount: 1000,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("code", "msg", "records");
    expect(res.body.msg).toEqual("Success");
    expect(res.body.code).toEqual(0);
    expect(res.body.records[0]).toHaveProperty(
      "key",
      "createdAt",
      "totalCount"
    );
  });
});
