import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

const handleClick = vi.fn();

const renderComponent = (
  props?: Partial<React.ComponentProps<typeof Button>>,
) =>
  render(
    <Button onClick={handleClick} {...props}>
      Click Me
    </Button>,
  );

describe("render button component", () => {
  beforeEach(() => {
    handleClick.mockClear();
  });

  it("renders the button", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the children text",()=>{
    renderComponent();
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  })

  it("calls onClick when button is clicked", async ()=>{
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  })

  it("does not call onClick when button is disabled and clicked", async ()=>{
    renderComponent({ disabled: true });
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });


});
