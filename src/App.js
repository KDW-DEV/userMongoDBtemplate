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
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

const root = document.querySelector("#root");

const App = () => {
  const [user, setUser] = useState();
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const handleMe = (e) => {
    axios.get("/users/me").then((resp) => console.log(resp));
  };
  const handleLogout = (e) => {
    axios.post("/users/me/logout").then((resp) => console.log(resp));
  };
  const handleLogoutAll = (e) => {
    axios.post("/users/me/logoutall").then((resp) => console.log(resp));
  };

  const renderLogin = () => {
    if (signUp) {
      return <SignUp setSignUp={setSignUp} signUp={signUp} />;
    } else {
      return <LogIn setSignUp={setSignUp} signUp={signUp} setUser={setUser} />;
    }
  };

  console.log(user);

  return (
    <Container className="App">
      {user ? <Dashboard user={user} setUser={setUser} /> : renderLogin()}
    </Container>
  );
};

export default App;
