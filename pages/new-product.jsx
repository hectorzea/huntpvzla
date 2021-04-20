import React, { Fragment, useState, useContext } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/layout/layout";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import {
  HuntForm,
  ErrorText,
  Field,
  InputSubmit,
} from "../components/ui/HuntForm";
import { FirebaseContext } from "../firebase";
import useValidation from "../hooks/useValidation";
import { validateCreateProduct } from "../validations/createProduct";
import Error404 from "../components/layout/404";
const INITIAL_STATE = {
  name: "",
  company: "",
  //image: "",
  url: "",
  urlImage: "",
  description: "",
};

const NewProductComponent = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);

  const [imageName, setImageName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleUploadProgress = (progress) => {
    setProgress({ progress });
  };
  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  };
  const handleUploadSuccess = (filename) => {
    setProgress(100);
    setUploading(false);
    setImageName(filename);
    firebase.storage
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImage(url);
      });
  };

  const router = useRouter();
  const { user, firebase } = useContext(FirebaseContext);
  const createProduct = async () => {
    try {
      if (!user) {
        router.push("/");
      }
      const product = {
        name,
        company,
        url,
        description,
        votes: 0,
        comments: [],
        urlImage,
        created_at: Date.now(),
        hasVotted: [],
        created_by: { id: user.uid, name: user.displayName },
      };
      firebase.db.collection("products").add(product);
      return router.push("/");
    } catch (error) {}
  };
  const {
    values,
    errors,
    submit,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateCreateProduct, createProduct);
  const { name, company, url, description } = values;
  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              New Product
            </h1>
            <HuntForm onSubmit={handleSubmit}>
              <fieldset>
                <legend>General Information</legend>

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
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Your company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.company && <ErrorText>{errors.company}</ErrorText>}
                <Field>
                  <label htmlFor="image">image</label>
                  <FileUploader
                    accept="image/*"
                    id="image"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage.ref("products")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleUploadProgress}
                  />
                </Field>
                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    placeholder="URL of your product"
                    id="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.url && <ErrorText>{errors.url}</ErrorText>}
              </fieldset>
              <fieldset>
                <legend>About your product</legend>
                <Field>
                  <label htmlFor="description">description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.description && (
                  <ErrorText>{errors.description}</ErrorText>
                )}
              </fieldset>
              {errorFirebase && <ErrorText>{errorFirebase}</ErrorText>}
              <InputSubmit type="submit" value="Create Product" />
            </HuntForm>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NewProductComponent;
