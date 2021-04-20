export const validateCreateAccount = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "The name is mandatory";
  }
  if (!values.email) {
    errors.email = "The email is mandatory";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "The email is not valid";
  }
  if (!values.password) {
    errors.password = "The password is mandatory";
  } else if (values.password.length < 6) {
    errors.password = "The password length must have at least 6 characters";
  }
  return errors;
};
