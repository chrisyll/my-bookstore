interface Filters {
  category: string[];
  year: string[];
  publisher: string[];
}

type FilterType = "category" | "year" | "publisher";

const getAvailableFilters = (): Filters => {
  return {
    category: ["Programming", "Web Development", "Technology", "JavaScript"],
    year: ["2020", "2019", "2018", "2017"],
    publisher: ["Apress", "No Starch Press", "Packt", "O'Reilly"],
  };
};

export { type FilterType, type Filters, getAvailableFilters };
