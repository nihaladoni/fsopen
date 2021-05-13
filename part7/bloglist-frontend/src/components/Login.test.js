import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

describe("Login component", () => {
  test("should have text content", () => {
    const component = render(<App />);

    expect(component.container).toHaveTextContent("Log-in to application");
  });
});
