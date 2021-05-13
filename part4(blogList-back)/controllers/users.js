const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter
  .get("/", async (request, response, next) => {
    const users = await User.find({}).populate("blogs");
    response.json(users.map((u) => u.toJSON()));
  })

  .post("/", async (request, response, next) => {
    const body = request.body;

    if (!request.body.password || !request.body.username) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  });

module.exports = userRouter;
