import styled from "styled-components";

interface ErrorMessageProps {
  error?: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <ErrorMessageContainer>{error}</ErrorMessageContainer>;
};

export { ErrorMessage };

const ErrorMessageContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
  font-size: 16px;
`;