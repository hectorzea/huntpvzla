import React, { useContext } from "react";
import Search from "../ui/Search";
import Navigation from "../layout/Navigation";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ButtonStyled from "../ui/ButtonStyled";
import { FirebaseContext } from "../../firebase";
const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  margin-right: 2rem;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Search />
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hi {user.displayName}
              </p>
              <ButtonStyled
                onClick={() => {
                  firebase.logout();
                }}
                bgColor={true}
              >
                Logout
              </ButtonStyled>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <ButtonStyled bgColor={true}>Login </ButtonStyled>
              </Link>
              <Link href={"/create-account"}>
                <ButtonStyled>Create Account</ButtonStyled>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};
export default Header;
