import express from "express";

import { getUsersList, createUser, getUserByID, deleteUserByID, updateUserByID } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsersList);
router.get("/user/:id", getUserByID);
router.post("/user", createUser);
router.delete("/user/:id", deleteUserByID);
router.put("/user/:id", updateUserByID);


export default router;
