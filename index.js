import express from "express";
// const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json()); //middleware all the body parsed has json

const users = [
  {
    createdAt: "2021-08-23T05:57:51.816Z",
    name: "Shaun Breitenbergs",
    avatar: "https://cdn.fakercloud.com/avatars/fjaguero_128.jpg",
    id: "1",
  },
  {
    createdAt: "2021-08-22T17:05:46.069Z",
    name: "Elijah D'Amore III",
    avatar: "https://cdn.fakercloud.com/avatars/kaysix_dizzy_128.jpg",
    id: "2",
  },
  {
    createdAt: "2021-08-22T21:26:00.130Z",
    name: "Donna Hansen",
    avatar: "https://cdn.fakercloud.com/avatars/bighanddesign_128.jpg",
    id: "7",
  },
  {
    createdAt: "2021-08-22T12:37:31.846Z",
    name: "Jared Sanford Sr.",
    avatar: "https://cdn.fakercloud.com/avatars/jacksonlatka_128.jpg",
    id: "8",
  },
  {
    createdAt: "2021-08-23T01:02:10.225Z",
    name: "Angelo Keeling",
    avatar: "https://cdn.fakercloud.com/avatars/superoutman_128.jpg",
    id: "9",
  },
  {
    createdAt: "2021-08-22T09:42:16.459Z",
    name: "Marcella Abbott",
    avatar: "https://cdn.fakercloud.com/avatars/gcmorley_128.jpg",
    id: "10",
  },
];
//connection to DB in local
const url = "mongodb://localhost";

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/users", (request, response) => {
  response.send(users);
});

app.post("/user", (request, response) => {
  const data = request.body;
  console.log(data);
  response.send({ msg: "Created" });
});

app.listen(PORT, () => console.log("This is port is start", PORT));
