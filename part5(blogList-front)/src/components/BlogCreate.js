import React from "react";

const BlogCreate = ({
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h1>Create a blog</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogCreate;
