const express = require("express");
const User = require("../models/Users");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users", async (req, res) => {
  console.log(req.body);
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("New User created.");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  //Login a registered user
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    const cookieOptions = {
      httpOnly: true,
      expires: 0,
    };
    res.cookie("jwtoken", token, cookieOptions); //create httpOnly cookie for client to handle token requests
    res.send({ id: user["_id"], name: user.name });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.clearCookie("jwtoken");
    res.send("Logged out successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.clearCookie("jwtoken");
    res.send("Logged out of all accounts successfully!");
  } catch (error) {
    console.log("EEROOR", error);
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  console.log(req.cookies.jwtoken);

  // View logged in user profile
  res.send(req.user);
});

module.exports = router;
