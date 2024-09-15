import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import styled from "styled-components";
import { SearchPage } from "./components/SearchPage/SearchPage";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<div></div>} />
          <Route path="/home/:bookCategory/:bookTitle" element={<div></div>} />
          <Route path="/home/book/add" element={<div></div>} />
          <Route path="/home/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
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
  width: 50vw;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
