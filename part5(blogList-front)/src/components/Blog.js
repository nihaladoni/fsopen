import React, { useState } from "react";

const Blog = ({ blog, onLikeClick, onRemoveClick }) => {
  const [showDetail, setShowDetail] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p className="blog-default">
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail((bool) => !bool)}>
          {showDetail ? "hide" : "show"}
        </button>
      </p>
      {showDetail && (
        <div className="url">
          <p>{blog.url}</p>
          <p className="like">
            likes: {blog.likes}
            <button id="like" onClick={() => onLikeClick(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <p>
            <button onClick={() => onRemoveClick(blog)}>remove</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
