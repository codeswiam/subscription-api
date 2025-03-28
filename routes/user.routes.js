import { Router } from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

import authorize from '../middlewares/auth.middleware.js'
import { signUp } from "../controllers/auth.controller.js";

const userRouter = Router();

// GET all users
userRouter.get("/", getUsers);

// GET a user by id, right authorization needed
userRouter.get("/:id", authorize, getUser); //the request passes by authorize before getUser

// CREATE a new user
userRouter.post("/", (req, res, next) => {
    signUp(req, res, next);
});

// UPDATE a user by id
userRouter.put("/:id", updateUser);

// DELETE a user by id
userRouter.delete("/:id", deleteUser);

export default userRouter;