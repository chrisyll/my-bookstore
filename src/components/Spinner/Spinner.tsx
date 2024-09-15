import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const Spinner = () => {
  return (
    <LoadingContainer>
      <PulseLoader color="#d3d3d3" />
    </LoadingContainer>
  );
};

export { Spinner };

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
