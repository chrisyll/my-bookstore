import { Navigate, Outlet } from "react-router-dom";
import { UnderConstructionPage } from "components/shared/UnderConstructionPage";
import { BookPage } from "components/book-page/BookPage";
import { AddBookPage } from "components/add-book-page/AddBookPage";
import { SearchPage } from "components/search-page/SearchPage";
import { Header } from "components/shared/Header";
import { Footer } from "components/shared/Footer";
import styled from "styled-components";

const AppLayout = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Footer />
    </>
  );
};

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

const routesConfig = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home/search" />,
      },
      {
        path: "/home/:bookCategory",
        element: <UnderConstructionPage />,
      },
      {
        path: "/home/:bookCategory/:bookTitle",
        element: <BookPage />,
      },
      {
        path: "/home/book",
        element: <UnderConstructionPage />,
      },
      {
        path: "/home/book/add",
        element: <AddBookPage />,
      },
      {
        path: "/home/search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/home/search" />,
      },
    ],
  },
];

export { routesConfig };
