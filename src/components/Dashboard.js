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
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

const Dashboard = ({ user, setUser }) => {
  const handleMe = (e) => {
    axios.get("/users/me").then((resp) => console.log(resp));
  };
  const handleLogout = (e) => {
    setUser();
    localStorage.removeItem("user");
    axios.post("/users/me/logout").then((resp) => console.log(resp));
  };
  const handleLogoutAll = (e) => {
    setUser();
    localStorage.removeItem("user");
    axios.post("/users/me/logoutall").then((resp) => console.log(resp));
  };

  console.log(user);

  return (
    <Container className="dashBoard">
      <Sidebar sidebar={<b>Sidebar content</b>} open={true} docked={true}>
        <Button onClick={handleLogout}>Log Out</Button>
        <Button onClick={handleLogoutAll}>Log Out All</Button>
        <b>Main content</b>
      </Sidebar>
    </Container>
  );
};

export default Dashboard;
