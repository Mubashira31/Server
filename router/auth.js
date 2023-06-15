const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
// const { getPosts,createPost, updatePost,deletePost,likePost } = require('../controllers/posts.js')

require("../db/conn");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const Student = require("../models/studentSchema");
const Suggestion = require("../models/suggestionSchema");
router.get("/", (req, res) => {
  res.send(`hello from router`);
});

router.post("/register", async (req, res) => {
  const {
    name,
    rollnum,
    portfolio,
    email,
    link,
    linkT,
    number,
    clubs,
    skills,
    password,
    cpassword,
  } = req.body;

  if (
    !name ||
    !rollnum ||
    !email ||
    !link ||
    !linkT ||
    !number ||
    !clubs ||
    !skills ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "plz fill the unfilled" });
  }

  try {
    const studentExist = await Student.findOne({ rollnum: rollnum });

    if (studentExist) {
      return res
        .status(422)
        .json({ error: "this roll num is already registered" });
    }
    const student = new Student({
      name: name,
      rollnum: rollnum,
      portfolio: portfolio,
      email: email,
      link: link,
      linkT: linkT,
      number: number,
      clubs: clubs,
      skills: skills,
      password: password,
      cpassword: cpassword,
    });
    //bcryption of the password

    const studentRegister = await student.save();
    if (studentRegister) {
      res.status(201).json({ message: "student registered successfully" });
    } else {
      res.status(500).json({ error: "failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ error: "Empty fields are not allowed" });
    }
    const studentLogin = await Student.findOne({ email: email });
    if (studentLogin) {
      const isMatch = await bcrypt.compare(password, studentLogin.password);

      token = await studentLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid credential" });
      } else {
        res.json({ message: "signin successfull" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//suggestion page
router.post("/suggestion", async (req, res) => {
  const { rollNum, club, suggest1 } = req.body;

  if (!rollNum || !club || !suggest1) {
    return res.status(422).json({ error: "plz fill the unfilled" });
  }

  try {
    const suggestion = new Suggestion({
      rollNum: rollNum,

      club: club,
      suggest1: suggest1,
    });

    const suggestRegister = await suggestion.save();
    if (suggestRegister) {
      res.status(201).json({ message: "suggestion added" });
    } else {
      res.status(500).json({ error: "failed to suggest" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about us page

router.get("/profile", authenticate, (req, res) => {
  res.cookie("test", "student");
  res.send(req.rootStudent);
});

//logout ka page
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
