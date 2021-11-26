import express from "express"; //default export
// const express = require("express");
import { MongoClient } from "mongodb"; //named export
import dotenv from "dotenv";
import cors from "cors";
import { getAllBrands } from "./helper.js";
import { router as Usersrouter } from "./routes/users.js";
import { router as Userrouter } from "./routes/user.js";
const app = express();

app.use(cors()); //allow the cross origin request
app.use(express.json()); //middleware all the body parsed has json
dotenv.config();

// MONGO_URL = "mongodb://localhost"
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
//connection to DB in local
export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/users", Usersrouter);
app.use("/user", Userrouter);

app.get("/brands", async (request, response) => {
  const result = await getAllBrands();
  response.send(result);
});

app.listen(PORT, () => console.log("This is port is start", PORT));

// app.post("/user", (request, response) => {
//   const data = request.body;
//   console.log(data);
//   response.send({ msg: "Created" });
// })

// app.post("/users", async (request, response) => {
//   const usersdata = request.body;
//   console.log(usersdata);
//   const client = await createConnection();
//   const result = await client
//     .db("flipkart")
//     .collection("users")
//     .insertMany(request.body);
//   response.send(result);
// });

// app.post("/users", async (request, response) => {
//   const userdata = request.body;
//   console.log(userdata);
//   const client = await createConnection();
//   const result = await client
//     .db("flipkart")
//     .collection("users")
//     .insertOne(request.body);
//   response.send(result);
// });
