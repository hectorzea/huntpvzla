import styled from "@emotion/styled";

export const HuntForm = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0;
  fieldset {
    margin: 2rem;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }
  input,
  textarea {
    flex: 1;
    padding: 1rem;
  }
  textarea {
    height: 200px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: "Open Sans", sans-serif;
  &:hover {
    cursor: pointer;
  }
`;

export const ErrorText = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
