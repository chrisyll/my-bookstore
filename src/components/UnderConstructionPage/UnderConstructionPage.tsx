import styled from "styled-components";

const UnderConstructionPage = () => {
  return (
    <MessageContainer>Sorry! Page is under construction!</MessageContainer>
  );
};

export { UnderConstructionPage };

const MessageContainer = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;
