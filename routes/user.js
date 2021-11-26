import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpNewUser, searchUserByName } from "../helper.js";
const router = express.Router();

//Generation the hashed password
async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

// genPassword("password@123");
// genPassword("password@123");

//signup the new user
router.post("/signup", async (request, response) => {
  const { name, password, avatar } = request.body;
  // console.log(name, password, avatar);
  const hashedPassword = await genPassword(password);
  const result = await signUpNewUser(name, avatar, hashedPassword);
  response.send(result);
});

//login the user
router.post("/login", async (request, response) => {
  const { name, password } = request.body;
  // console.log(name, password);
  const user = await searchUserByName(name);
  if (user) {
    const passwordStoredInDb = user.password;
    const loginFormPassword = password;
    const isPasswordMatch = await bcrypt.compare(
      loginFormPassword,
      passwordStoredInDb
    );
    if (isPasswordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      response.send({ message: "Successfully login", token: token });
    } else {
      response.send({ message: "Invalid login" });
    }
  } else {
    response.send({ message: "invalid login" });
  }
});

export { router };
