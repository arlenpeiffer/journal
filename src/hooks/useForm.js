import { useState } from "react";

const useForm = (initialValues, validationSchema, callback) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleValidation = async () => {
    await validationSchema
      .validate(values, { abortEarly: false })
      .then(values => callback(values))
      .catch(error => {
        return error.inner.reduce((errors, error) => {
          errors[error.path] = error.message;
          return errors;
        }, {});
      })
      .then(errors => {
        setErrors(errors);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleValidation();
  };

  return {
    errors,
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
