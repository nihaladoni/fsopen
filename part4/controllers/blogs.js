const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter
  .get("/", async (req, res) => {
    const allBlogs = await Blog.find({}).populate("user");
    res.json(allBlogs.map((blog) => blog.toJSON()));
  })

  .post("/", async (req, res) => {
    const token = getTokenFrom(req);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!req.body.title || !req.body.url) {
      return res.status(400).json({
        error: "content missing",
      });
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes === undefined ? 0 : req.body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.json(savedBlog.toJSON());
  })

  .get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog.toJSON());
    } else {
      res.status(404).end();
    }
  })
  .put("/:id", async (req, res) => {
    const blog = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    };

    const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.json(newBlog.toJSON());
  })
  .delete("/:id", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } else {
      return res.status(403).json({ error: "invalid delete operation" });
    }
  });

module.exports = blogRouter;
