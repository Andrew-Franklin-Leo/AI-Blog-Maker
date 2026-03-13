import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "../../test/test-utils";
import { useToast, Toaster } from "./Toaster";
import { useEffect } from "react";

const TestComponent = ({
  message,
  type,
}: {
  message: string;
  type?: "success" | "error" | "info";
}) => {
  const { addToast } = useToast();

  useEffect(() => {
    addToast(message, type);
  }, [addToast, message, type]);

  return <div>Test Component</div>;
};

describe("Toaster System", () => {
  it("displays a toast when addToast is called", async () => {
    render(
      <>
        <TestComponent message="Hello World" type="success" />
        <Toaster />
      </>,
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toHaveClass("bg-green-500");
  });

  it("removes the toast after the duration", async () => {
    vi.useFakeTimers();

    render(
      <>
        <TestComponent message="Temporary Toast" />
        <Toaster duration={1000} />
      </>,
    );

    expect(screen.getByText("Temporary Toast")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText("Temporary Toast")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
