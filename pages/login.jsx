import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/layout/layout";
import Router, { useRouter } from "next/router";
import {
  HuntForm,
  ErrorText,
  Field,
  InputSubmit,
} from "../components/ui/HuntForm";
import firebase from "../firebase";
import useValidation from "../hooks/useValidation";
import { validateLogin } from "../validations/login";

const LoginComponent = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);
  const INITIAL_STATE = { email: "", password: "" };
  const router = useRouter();
  const doLogin = async () => {
    try {
      const user = await firebase.login(email, password);
      router.push("/");
    } catch (error) {
      console.error("error auth user", error);
      setErrorFirebase(error.message);
    }
  };
  const {
    values,
    errors,
    submit,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateLogin, doLogin);
  const { name, email, password } = values;
  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Login
          </h1>
          <HuntForm onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Your email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
            {errorFirebase && <ErrorText>{errorFirebase}</ErrorText>}
            <InputSubmit type="submit" value="Login" />
          </HuntForm>
        </>
      </Layout>
    </div>
  );
};

export default LoginComponent;
