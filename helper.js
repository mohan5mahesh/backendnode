import { ObjectId } from "mongodb";
import { createConnection } from "./index.js";

async function getAllUsers() {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .find({})
    .toArray();
  return result;
}
async function getUserById(request) {
  const { id } = request.params;
  console.log({ id });
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .find({ _id: ObjectId(id) })
    .toArray();
  return result;
}

async function getAllBrands() {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("brands")
    .find({})
    .toArray();
  return result;
}
async function signUpNewUser(name, avatar, hashedPassword) {
  const client = await createConnection();
  const result = await client.db("flipkart").collection("users").insertOne({
    name: name,
    avatar: avatar,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  return result;
}

async function deleteUserById(id) {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
  return result;
}
async function searchUserByName(name) {
  const client = await createConnection();
  const result = await client
    .db("flipkart")
    .collection("users")
    .findOne({ name: name });

  return result;
}
export {
  getAllUsers,
  getUserById,
  getAllBrands,
  signUpNewUser,
  deleteUserById,
  searchUserByName,
};
