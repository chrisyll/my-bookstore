type FormValues = {
  forms: {
    title: string;
    description: string;
    categories: string[];
    author: string[];
    publisher: string;
    published: number;
    pages: number;
    image: File | null;
    rating: number;
    isbn10: string;
    isbn13: string;
  }[];
};

const formSubmitHandler = (values: FormValues) => {
  console.log("Form submitted with: ", values);
};

const cleanAndConvertToNumber = (input: string): number => {
  const cleanedValue = input.replace(/[^0-9]/g, "");
  return cleanedValue ? Number(cleanedValue) : 0;
};

export { formSubmitHandler, cleanAndConvertToNumber, type FormValues };
