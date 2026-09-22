import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

const PORTFOLIO_URL = "https://nokono.net/";
const SITE_URL = "https://study-tracker.nokono.net/";

describe("NotFound", () => {
  it("should link My Portfolio to the portfolio on the nokono.net domain", () => {
    render(<NotFound />);

    expect(screen.getByRole("link", { name: "My Portfolio" })).toHaveAttribute(
      "href",
      PORTFOLIO_URL
    );
  });

  it("should link Study Tracker to the app on the nokono.net domain", () => {
    render(<NotFound />);

    expect(screen.getByRole("link", { name: "Study Tracker" })).toHaveAttribute(
      "href",
      SITE_URL
    );
  });
});
