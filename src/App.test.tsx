import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { routesConfig } from "routes";

vi.mock("hooks/useFetchBooks", () => ({
  useFetchBooks: vi.fn().mockReturnValue({
    books: [
      {
        isbn10: "1234567890",
        isbn13: "1234567890123",
        title: "Mock Book 1",
        author: ["Author 1"],
        published: "2024",
        publisher: "Publisher",
        pages: 300,
        description: "A mock book description",
        categories: ["Category 1"],
        imageURL: "/path/to/image",
        rating: 4,
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe("App Component", () => {
  it("renders Header and Footer", () => {
    render(<App />);

    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("app-footer")).toBeInTheDocument();
  });

  it("redirects to /home/search on root path", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/home/search"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId("app-header"));
    expect(screen.getByTestId("app-search-page")).toBeInTheDocument();
  });

  it("renders UnderConstructionPage for /home/:bookCategory route", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/home/science"],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByTestId("app-under-construction-page")
    ).toBeInTheDocument();
  });
});
