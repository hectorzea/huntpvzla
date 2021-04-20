import styled from "@emotion/styled";
const ButtonStyled = styled.a`
  display: block;
  margin: 2rem auto;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  border: solid 1px #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;
export default ButtonStyled;
