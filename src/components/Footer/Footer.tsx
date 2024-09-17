import styled from "styled-components";

/**
 * Represents a footer component
 *
 * @returns {JSX.Element}
 */
const Footer = () => {
  return <FooterContainer />;
};

const FooterContainer = styled.div`
  border: 1px solid black;
  background-color: #f1f1f1;
  margin: 8px 0;
  height: 96px;
  width: 100%;
`;

export { Footer };
