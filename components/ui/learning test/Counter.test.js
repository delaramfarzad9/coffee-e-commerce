import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increases count when button is clicked", async () => {
  render(<Counter />);

  const count = screen.getByTestId("count");
  const button = screen.getByRole("button", { name: /increase/i });

  expect(count.textContent).toBe("0");

  await userEvent.click(button);

  expect(count.textContent).toBe("1");
});
