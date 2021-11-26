import express from "express";
import { getAllUsers, getUserById, deleteUserById } from "../helper.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, async (request, response) => {
  const result = await getAllUsers();
  response.send(result);
});

router.get("/:id", auth, async (request, response) => {
  const result = await getUserById(request);
  response.send(result);
});
//delete the old user
router.delete("/:id", auth, async (request, response) => {
  const { id } = request.params;
  console.log({ id });
  const result = await deleteUserById(id);
  response.send(result);
});
export { router };
