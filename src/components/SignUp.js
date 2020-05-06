import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const root = document.querySelector("#root");

const SignUp = ({ setSignUp, signUp }) => {
  const submitForm = (e) => {
    e.preventDefault();
    let newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
    };
    console.log(newUser);

    axios
      .post("/users/", newUser)
      .then((result) => {
        setSignUp(!signUp);
      })
      .catch(function (error) {
        alert("Failed to create new User.");
        console.log(error);
      });
  };

  return (
    <Container className="signUp">
      <h2>Sign Up</h2>
      <Form onSubmit={submitForm} className="form">
        <Col>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="name"
              name="name"
              id="exampleName"
              placeholder="John Doe"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
        </Col>
        <Button>Sign Up</Button>
        <Button
          onClick={(e) => {
            setSignUp(!signUp);
          }}
        >
          Back
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
