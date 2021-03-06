import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const Nav = styled.div`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "Open Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navigation = () => {
  const { user } = useContext(FirebaseContext);
  return (
    <Nav>
      <Link href={"/"}>
        <a>Home</a>
      </Link>
      <Link href={"/trending"}>
        <a>Featured</a>
      </Link>
      {user && (
        <Link href={"/new-product"}>
          <a>New Product</a>
        </Link>
      )}
    </Nav>
  );
};

export default Navigation;
