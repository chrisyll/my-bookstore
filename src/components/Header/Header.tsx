import { useLocation } from "react-router-dom";
import styled from "styled-components";

const capitalizePath = (path: string) => {
  return path
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" / ");
};

const Header = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <HeaderContainer>
        <HeaderText>Bookstore</HeaderText>
      </HeaderContainer>
      <PageHeaderContainer>
        <PathContainer>{capitalizePath(path)}</PathContainer>
        <HeadlineContainer>Search to find your new book</HeadlineContainer>
      </PageHeaderContainer>
    </div>
  );
};

const HeaderContainer = styled.div`
  border: 1px solid black;
  background-color: #f1f1f1;
  margin: 8px 0;
  height: 72px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  font-weight: 400;
  font-size: 44px;
  color: #333333;
`;

const PageHeaderContainer = styled.div`
  width: 100%;
  height: 56px;
  gap: 8px;
  position: relative;
  margin-top: 16px;
  box-sizing: border-box;
`;

const PathContainer = styled.div`
  position: absolute;
  font-size: 14px;
  color: #858585;
  left: 104px;
`;

const HeadlineContainer = styled.div`
  line-height: 56px;
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

export { Header };
