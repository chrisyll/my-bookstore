import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { routesConfig } from "routes";

const App = () => {
  const router = createBrowserRouter(routesConfig);

  return (
    <AppContainer>
      <RouterProvider router={router} />
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
