import express from "express";
import { validateJoi, Schemas } from "../middleware/joi";
import { createUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateJoi(Schemas.user.create), createUser);

export { router as usersRouter };
