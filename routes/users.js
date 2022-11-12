import express from "express";

import { getUsersList, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsersList);
router.post("/user", createUser);


export default router;
