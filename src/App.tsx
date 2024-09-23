import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import styled from "styled-components";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { AddBookPage } from "./components/AddBookPage/AddBookPage";
import { BookPage } from "./components/BookPage/BookPage";
import { UnderConstructionPage } from "./components/UnderConstructionPage/UnderConstructionPage";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/home/search" />} />
          <Route
            path="/home/:bookCategory"
            element={<UnderConstructionPage />}
          />
          <Route path="/home/:bookCategory/:bookTitle" element={<BookPage />} />
          <Route path="/home/book" element={<UnderConstructionPage />} />
          <Route path="/home/book/add" element={<AddBookPage />} />
          <Route path="/home/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/home/search" />} />
        </Routes>
      </ContentContainer>
      <Footer />
    </AppContainer>
  );
};

export { App };

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;
