import React from "react";
import { Button, Form, Icon, Input } from "antd";
import useForm from "../hooks/useForm";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const { errors, handleChange, handleSubmit, values } = useForm(
    initialValues,
    validationSchema,
    callback,
  );

  function callback(value) {
    console.log(value);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item
          label="Username"
          help={errors && errors.username}
          validateStatus={errors && errors.username && "warning"}
        >
          <Input
            autoComplete="off"
            autoFocus
            name="username"
            onChange={handleChange}
            placeholder="Username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={values.username}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          help={errors && errors.password}
          validateStatus={errors && errors.password && "warning"}
        >
          <Input.Password
            autoComplete="off"
            name="password"
            onChange={handleChange}
            onPressEnter={handleSubmit}
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={values.password}
          />
        </Form.Item>
        <Button onClick={handleSubmit}>Enter</Button>
      </Form>
    </div>
  );
};

export default Login;
