import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import styled from "styled-components";
import { BookPreview } from "./components/BookPreview";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"/home"} /> },
  { path: "/home", element: <div></div> },
  { path: "/home/:bookCategory/:bookName", element: <div></div> },
  { path: "/home/book/add", element: <div></div> },
  { path: "/home/search", element: <div></div> },
]);

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <RouterProvider router={router} />
        <BookPreview />
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
`;
