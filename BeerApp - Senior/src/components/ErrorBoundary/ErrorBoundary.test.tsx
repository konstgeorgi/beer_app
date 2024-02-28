import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "./ErrorBoundary";

// Mock child component that throws an error
const ProblematicChild = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary", () => {
  test("should catch errors in child component and render NotFound", () => {
    render(
      <ErrorBoundary>
        <ProblematicChild />
      </ErrorBoundary>,
    );

    screen.debug();

    const notFoundMessage = screen.queryByText(/404/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
