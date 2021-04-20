import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  border: none;
  text-indent: -9999px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

export const Search = () => {
  const [search, setSearch] = useState("");
  const searchProduct = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    Router.push({ pathname: "/search", query: { q: search } });
  };
  return (
    <form
      action=""
      css={css`
        position: relative;
      `}
    >
      <InputText
        type="text"
        placeholder="Search Products..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputSubmit onClick={searchProduct} type="submit">
        Search
      </InputSubmit>
    </form>
  );
};
export default Search;
