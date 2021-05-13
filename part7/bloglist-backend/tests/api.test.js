const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../utils/list_helper");
const app = require("../index");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe("Blog API test", () => {
  // 1
  test("blog id should be defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  // 2
  test("likes count is zero when not provided", async () => {
    const response = await api
      .post("/api/blogs")
      .send({ title: "react", author: "abc", url: "wwww" });
    expect(response.body.likes).toBe(0);
  });
  // 3
  test("if title or url empty", async () => {
    const response = await api.post("/api/blogs").send({ author: "John Doe" });
    expect(400);
  });
});

/////////////////////////////////////////
//  Testing User Route
/////////////////////////////////////////

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "test1", passwordHash });

    await user.save();
  });

  // 1
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  // 2

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
