const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPost) =>
  blogPost.reduce((acc, item) => (acc += item.likes), 0);

const favoriteBlog = (blogPost) =>
  blogPost.reduce((acc, item) => (acc.likes > item.likes ? acc : item), 0);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "React patterns 1",
    author: "WALTER joHN",
    url: "https://reactpatterns1.com/",
    likes: 7,
  },
  {
    title: "React patterns 2",
    author: "jOHN Chan",
    url: "https://reactpatterns2.com/",
    likes: 7,
  },
  {
    title: "React patterns 3",
    author: "Albert",
    url: "https://reactpatterns3.com/",
    likes: 7,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  initialBlogs,
  usersInDb,
};
