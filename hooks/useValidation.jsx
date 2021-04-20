import React, { useState, useEffect } from "react";

const useValidation = (initialState, validateFn, submitFn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        submitFn();
      }
      setSubmit(false);
    }
  }, [errors]);

  //function handled when the user types something...

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    setSubmit(true);
  };

  const handleBlur = (e) => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    submit,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
