import { render, screen, waitFor } from "@testing-library/react";
import { AddBookForm } from "./AddBookForm";
import userEvent from "@testing-library/user-event";
import { formSubmitHandler } from "utils/formHandlers";

window.URL.createObjectURL = vi.fn(() => "mocked-image-url");

describe("AddBookForm test", () => {
  it("submits the form with valid data", async () => {
    const handleSubmit = vi.fn().mockImplementation(formSubmitHandler);
    const user = userEvent.setup();

    const file = new File(["dummy image content"], "book-cover.jpg", {
      type: "image/jpg",
    });

    render(<AddBookForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/Title:/i), "Test Book 1");
    await user.type(
      screen.getByLabelText(/Description:/i),
      "A test description"
    );
    await user.type(screen.getByLabelText(/Categories:/i), "Fiction");
    await user.type(screen.getByLabelText(/Authors:/i), "John Doe");
    await user.type(screen.getByLabelText(/Publisher:/i), "Test Publisher");
    await user.type(screen.getByLabelText(/Published:/i), "2023");
    await user.type(screen.getByLabelText(/Pages:/i), "300");
    await user.type(screen.getByLabelText(/Rating:/i), "4");
    await user.type(screen.getByLabelText(/ISBN-10:/i), "1234567890");
    await user.type(screen.getByLabelText(/ISBN-13:/i), "1234567890123");

    await user.upload(screen.getByLabelText(/Image/i), file);

    await user.click(screen.getByText(/SAVE/i));

    //IGNORE FORMIK HELPERS
    //IGNORE FORMIK HELPERS
    //IGNORE FORMIK HELPERS
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          forms: [
            {
              title: "Test Book 1",
              description: "A test description",
              categories: ["Fiction"],
              authors: ["John Doe"],
              publisher: "Test Publisher",
              published: 2023,
              pages: 300,
              image: file,
              rating: 4,
              isbn10: "1234567890",
              isbn13: "1234567890123",
            },
          ],
        },
        expect.anything()
      );
    });
  });
});
