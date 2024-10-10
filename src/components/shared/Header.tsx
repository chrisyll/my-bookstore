import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Represents a header component
 *
 * @returns {JSX.Element}
 */
const Header = () => {
  const path = useLocation().pathname;
  const segments = path.split("/").filter(Boolean);

  const navigate = useNavigate();

  //GET HEADLINE OF HEADER ACCORDING TO URL PATH
  const getHeadline = (path: string) => {
    switch (path) {
      case "/home/search":
        return "Search to find your new book";
      case "/home/book/add":
        return "Add new Book";
      default:
        return "";
    }
  };
  return (
    <div data-testid="app-header">
      <HeaderContainer>
        <HeaderText>Bookstore</HeaderText>
      </HeaderContainer>
      <HeaderInfoContainer>
        <PathContainer>
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <PathSegment
                onClick={() =>
                  navigate(`/${segments.slice(0, index + 1).join("/")}`)
                }
              >
                {segment.charAt(0).toUpperCase() +
                  segment.slice(1).replace(/%20/g, " ")}
              </PathSegment>
              {index !== segments.length - 1 && <Separator>/</Separator>}
            </React.Fragment>
          ))}
        </PathContainer>
        <HeadlineContainer>{getHeadline(path)}</HeadlineContainer>
      </HeaderInfoContainer>
    </div>
  );
};

export { Header };

const HeaderContainer = styled.div`
  border: 1px solid black;
  background-color: #2c3e50;
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
  color: white;
`;

const HeaderInfoContainer = styled.div`
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
  left: 280px;
  display: flex;
`;

const PathSegment = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 4px;
`;

const HeadlineContainer = styled.div`
  line-height: 56px;
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;
