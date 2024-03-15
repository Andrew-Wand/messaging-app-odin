import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  console.log(password);
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstName, lastName, username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div>
      <div>
        <Form onSubmit={handleRegister} ref={form}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <Input
              type="text"
              name="first_name"
              value={firstName}
              onChange={onChangeFirstName}
              validations={[required]}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <Input
              type="text"
              name="last_name"
              value={lastName}
              onChange={onChangeLastName}
              validations={[required]}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required, vusername]}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required, vpassword]}
            />
          </div>

          <div>
            <button>
              <span>Sign up</span>
            </button>
          </div>

          {message && <div>{message}</div>}
          <CheckButton ref={checkBtn} style={{ display: "none" }} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
