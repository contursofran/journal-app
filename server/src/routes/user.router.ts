import express from "express";
import { validateJoi, Schemas } from "../middleware/joi";
import { createUser, getUserName } from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateJoi(Schemas.user.create), createUser);
router.get("/", getUserName);

export { router as usersRouter };
