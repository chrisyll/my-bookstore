import * as Yup from "yup";

const BookSchema = Yup.object().shape({
  forms: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
        .min(10, "Title must be at least 10 characters")
        .max(120, "Title cannot exceed 120 characters")
        .matches(
          /^[a-zA-Z0-9@”#&*! ]+$/,
          "Only special characters: @”#&*! are allowed"
        )
        .required("Title is required"),
      description: Yup.string()
        .max(512, "Description limit 512 characters")
        .matches(/^[A-Z]/, "Description must start with an uppercase letter")
        .required("Description is required"),
      categories: Yup.array()
        .of(Yup.string().required("Category is required"))
        .min(1, "Category is required")
        .max(4, "You can only add up to 4 categories"),
      authors: Yup.array()
        .of(Yup.string().required("Author is required"))
        .min(1, "Author is required")
        .max(3, "You can only add up to 3 authors"),
      publisher: Yup.string()
        .min(5, "Publisher must be at least 5 characters")
        .max(60, "Publisher cannot exceed 60 characters")
        .required("Publisher is required"),
      published: Yup.number()
        .required("Year is required")
        .min(1000, "Year must be a 4-digit number")
        .max(9999, "Year must be a 4-digit number"),
      pages: Yup.number()
        .max(9999, "Page number cannot exceed 9999")
        .required("Page numbers are required"),
      image: Yup.mixed().required("Image is required"),
      rating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .nullable(),
      isbn10: Yup.string()
        .matches(/^\d{10}$/, "ISBN-10 must be exactly 10 digits")
        .required("ISBN-10 is required"),
      isbn13: Yup.string()
        .matches(/^\d{13}$/, "ISBN-13 must be exactly 13 digits")
        .required("ISBN-13 is required"),
    })
  ),
});

export { BookSchema };
