import React, { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import BlogCreate from "./components/BlogCreate";
import Login from "./components/Login";
import Notify from "./components/Notify";
import Toggler from "./components/Toggler";
import * as blogService from "./services/blogs";
import login from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogCreateRef = useRef();

  //  state for Login form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(null);

  // state for BlogCreate form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (name && password) {
      const userObj = {
        username: name,
        password,
      };
      const responseData = await login(userObj);
      if (responseData.name !== "Error") {
        setName("");
        setPassword("");

        setUser(responseData);
        window.localStorage.setItem("localUser", JSON.stringify(responseData));
      } else {
        console.log(responseData.response.data.error);
        setNotify({
          type: "error",
          message: responseData.response.data.error,
        });
        setTimeout(() => {
          setNotify(null);
        }, 5000);
      }
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();

    const newBlogObj = {
      title,
      author,
      url,
    };

    const newBlog = await blogService.create(newBlogObj);

    setTitle("");
    setAuthor("");
    setUrl("");

    setBlogs(blogs.concat(newBlog));

    blogCreateRef.current.toggleVisibility();

    setNotify({ type: "success", ...newBlog });
    setTimeout(() => {
      setNotify(null);
    }, 5000);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("localUser");
    setUser(null);
    setBlogs([]);
  };

  const handleLikeClick = async (uniqueBlog) => {
    const putRequestObj = {
      ...uniqueBlog,
      likes: uniqueBlog.likes + 1,
      user: uniqueBlog.user.id,
    };

    const updatedLikeBlog = await blogService.updateLikes(putRequestObj);

    setBlogs(
      blogs
        .map((b) => (b.id !== uniqueBlog.id ? b : updatedLikeBlog))
        .sort((a, b) => b.likes - a.likes)
    );
  };
  const handleRemoveClick = async (deleteBlog) => {
    const bool = window.confirm(`Remove ${deleteBlog.title} ?`);

    if (bool) {
      await blogService.removeBlog(deleteBlog);

      setBlogs(
        blogs
          .filter((b) => b.id !== deleteBlog.id)
          .sort((a, b) => b.likes - a.likes)
      );
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs.sort((a, b) => b.likes - a.likes));
      })();
    }
  }, [user]);

  useEffect(() => {
    const userLocal = window.localStorage.getItem("localUser");

    if (userLocal) {
      const userFromLocal = JSON.parse(userLocal);
      setUser(userFromLocal);
      blogService.setToken(userFromLocal.token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <Toggler buttonLabel="login">
          <Login
            username={name}
            password={password}
            handleUsernameChange={({ target }) => setName(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLoginUser}
          />

          {notify && <Notify type={notify.type} message={notify.message} />}
        </Toggler>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>logout</button>
          </p>

          {notify && (
            <Notify type={notify.type} message={`Added ${notify.title}`} />
          )}

          <Toggler buttonLabel="new blog" ref={blogCreateRef}>
            <BlogCreate
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleSubmit={addBlog}
            />
          </Toggler>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLikeClick={handleLikeClick}
              onRemoveClick={handleRemoveClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
