import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText>Bookstore</HeaderText>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  border: 1px solid black;
  background-color: #f1f1f1;
  margin: 8px 0;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  font-weight: 500;
  font-size: 40px;
`;

export { Header };
