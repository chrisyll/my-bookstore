import styled from "styled-components";

const Footer = () => {
  return <FooterContainer />;
};

const FooterContainer = styled.div`
  border: 1px solid black;
  background-color: #f1f1f1;
  margin: 8px 0;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Footer };
