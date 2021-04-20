import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/layout/layout";
import Router from "next/router";
import {
  HuntForm,
  ErrorText,
  Field,
  InputSubmit,
} from "../components/ui/HuntForm";
import firebase from "../firebase";
import useValidation from "../hooks/useValidation";
import { validateCreateAccount } from "../validations/createAccount";
const INITIAL_STATE = { name: "", email: "", password: "" };

const CreateAccountComponent = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);

  const createAccount = async () => {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("error", error);
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
  } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);
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
            Create Account{" "}
          </h1>
          <HuntForm onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
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
            <InputSubmit type="submit" value="Create Account" />
          </HuntForm>
        </>
      </Layout>
    </div>
  );
};

export default CreateAccountComponent;
