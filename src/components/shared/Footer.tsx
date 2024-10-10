import styled from "styled-components";

/**
 * Represents a footer component
 *
 * @returns {JSX.Element}
 */
const Footer = () => {
  return <FooterContainer data-testid="app-footer" />;
};

export { Footer };

const FooterContainer = styled.div`
  border: 1px solid black;
  background-color: #2c3e50;
  margin: 8px 0;
  height: 96px;
  width: 100%;
  box-sizing: border-box;
`;
