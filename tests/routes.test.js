const request = require("supertest");
const app = require("../app");

describe("API Endpoint tests", () => {
  it("should show welcome json", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      title: "Welcome, to GETIR",
    });
  });

  it("should show 100 records from the collection", async () => {
    const res = await request(app).get("/records?skip=0&limit=100");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("records");
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
  });
});
