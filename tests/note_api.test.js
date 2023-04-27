const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 50000);

test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(3);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  expect(response.body[1].content).toBe("CSS is hard");
});

afterAll(async () => {
  await mongoose.connection.close();
});
