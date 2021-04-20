import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import { Layout } from "../../components/layout/layout";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Field, InputSubmit } from "../../components/ui/HuntForm";
import ButtonStyled from "../../components/ui/ButtonStyled";

const Product = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const router = useRouter();
  const [comment, setComment] = useState({});
  const [handleQuery, setHandleQuery] = useState(true);
  const {
    query: { id },
  } = router;

  const ContainerProduct = styled.div`
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 2rem;
    }
  `;

  const ProductCreator = styled.p`
    padding: 0.5rem 2rem;
    background-color: #da552f;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    color: white;
  `;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && handleQuery) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          setProduct(product.data());
          setHandleQuery(false);
        } else {
          setError(true);
          setHandleQuery(false);
        }
      };
      getProduct();
    }
  }, [id]);

  if (Object.keys(product).length === 0 && !error) return "Cargando...";

  const {
    comments,
    created_at,
    description,
    company,
    name,
    url,
    urlImage,
    votes,
    created_by,
    hasVotted,
  } = product;

  const voteProduct = () => {
    console.log("voting");
    if (!user) {
      return router.push("/login");
    }
    //obtain an plus votes
    const totalVotes = votes + 1;
    if (hasVotted.includes(user.uid)) return;
    const votedNow = [...hasVotted, user.uid];
    //update db
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVotted: votedNow });
    //update state
    setProduct({ ...product, votes: totalVotes });
    setHandleQuery(true);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }

    comment.userId = user.uid;
    comment.userName = user.displayName;

    const newComments = [...comments, comment];

    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });

    setProduct({ ...product, comments: newComments });
    setHandleQuery(true);
  };

  const isCreator = (id) => {
    return created_by.id === id;
  };

  const ableToDelete = () => {
    if (!user) {
      return false;
    }
    if (created_by.id === user.uid) {
      return true;
    }
  };

  const onChangeComment = (value) => {
    setComment({ ...comment, message: value });
  };

  const deleteProduct = async () => {
    if (!user) {
      return router.push("/login");
    }
    if (created_by.id !== user.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>
            <div
              css={css`
                @media (min-width: 768px) {
                  display: grid;
                  grid-template-columns: 2fr 1fr;
                  column-gap: 2rem;
                }
              `}
            >
              <div>
                <p>Posted {formatDistanceToNow(new Date(created_at))} ago</p>
                <p>
                  Published by {created_by.name} from {company}
                </p>
                <img src={urlImage} alt="" />
                <p>{description}</p>
                {user && (
                  <>
                    <h2>Add your comment</h2>
                    <form onSubmit={addComment}>
                      <Field>
                        <input
                          type="text"
                          name="message"
                          onChange={(e) => onChangeComment(e.target.value)}
                        />
                      </Field>
                      <InputSubmit type="submit" value="Add Comment" />
                    </form>
                    <h2
                      css={css`
                        margin: 2rem 0;
                      `}
                    >
                      Comments
                    </h2>
                  </>
                )}
                {comments.length === 0
                  ? "No comments"
                  : comments.map((c, i) => (
                      <ul>
                        <li
                          key={`${c.userId}-${i}`}
                          css={css`
                            border: solid 1px #e1e1e1;
                            padding: 2rem;
                          `}
                        >
                          <p>{c.message}</p>
                          <p>
                            Written by:
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {" "}
                              {c.userName}
                            </span>
                          </p>
                          {isCreator(c.userId) && (
                            <ProductCreator>Is Creator</ProductCreator>
                          )}
                        </li>
                      </ul>
                    ))}
              </div>
              <aside>
                <ButtonStyled target={"_blank"} bgColor={true} href={url}>
                  Visit URL
                </ButtonStyled>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                ></div>
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes} Votes
                  {user && (
                    <ButtonStyled onClick={voteProduct}>Vote</ButtonStyled>
                  )}
                </p>
              </aside>
            </div>
            {ableToDelete() && (
              <ButtonStyled onClick={deleteProduct}>
                Delete Product
              </ButtonStyled>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
