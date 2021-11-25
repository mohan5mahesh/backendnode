import express from "express"; //default export
// const express = require("express");
import { MongoClient } from "mongodb"; //named export
import dotenv from "dotenv";
import cors from "cors";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
const app = express();

app.use(cors()); //allow the cross origin request
app.use(express.json()); //middleware all the body parsed has json
dotenv.config();

// MONGO_URL = "mongodb://localhost"
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

//Generation the hashed password
async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}
// genPassword("password@123");
// genPassword("password@123");

//connection to DB in local
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/users", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .find({})
    .toArray();
  response.send(result);
});

app.get("/users/:id", async (request, response) => {
  const { id } = request.params;
  console.log({ id });
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .find({ _id: ObjectId(id) })
    .toArray();
  response.send(result);
});

app.post("/users", async (request, response) => {
  const usersdata = request.body;
  console.log(usersdata);
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .insertMany(request.body);
  response.send(result);
});

app.post("/user", async (request, response) => {
  const userdata = request.body;
  console.log(userdata);
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .insertOne(request.body);
  response.send(result);
});
//signup the new user
app.post("/user/signup", async (request, response) => {
  const { name, password, avatar } = request.body;
  console.log(name, password, avatar);
  const hashedPassword = await genPassword(password);
  const client = await createConnection();
  const result = await client.db("flipkart").collection("users").insertOne({
    name: name,
    avatar: avatar,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  response.send(result);
});

app.delete("/users/:id", async (request, response) => {
  const { id } = request.params;
  console.log({ id });
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
  response.send(result);
});

app.get("/brands", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("brands")
    .find({})
    .toArray();
  response.send(result);
});

// app.post("/user", (request, response) => {
//   const data = request.body;
//   console.log(data);
//   response.send({ msg: "Created" });
// });

app.listen(PORT, () => console.log("This is port is start", PORT));
