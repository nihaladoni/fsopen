import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Blog from "./Blog";

describe("Blog component", () => {
  test("should have text content of only title and author", () => {
    const blog = {
      title: "React",
      author: "University Of Helsinki",
      likes: 20,
      url: "https://fullstackopen.com/en",
      user: {
        name: "Some name",
      },
    };

    const component = render(<Blog blog={blog} />);

    const blogView = component.container.querySelector(".blog-default");
    expect(blogView).toHaveTextContent("React");
    expect(blogView).toHaveTextContent("University Of Helsinki");
  });

  test("clicking the button displays likes and url", () => {
    const blog = {
      title: "React",
      author: "University Of Helsinki",
      likes: 20,
      url: "https://fullstackopen.com/en",
      user: {
        name: "Some name",
      },
    };

    const component = render(<Blog blog={blog} />);

    const button = component.getByText("show");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      "https://fullstackopen.com/en"
    );
  });

  test("clicking like button twice", () => {
    const blog = {
      title: "React",
      author: "University Of Helsinki",
      likes: 20,
      url: "https://fullstackopen.com/en",
      user: {
        name: "Some name",
      },
    };
    const mockHandler = jest.fn();
    const { debug } = render(
      <Blog blog={blog} updateLikeCount={mockHandler} />
    );

    fireEvent.click(screen.getByText("show"));

    debug();

    fireEvent.click(screen.getByText("like"));
    fireEvent.click(screen.getByText("like"));

    expect(mockHandler.mock.calls.length).toHaveLength(2);
  });
});
