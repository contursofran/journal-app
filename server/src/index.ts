import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { config } from "./config/config";
import Logging from "./utils/logging";
import { decodeToken } from "./middleware/auth";
import { notesRouter } from "./routes/note.router";
import { usersRouter } from "./routes/user.router";

const router = express();

const StartServer = () => {
  router.use((req, res, next) => {
    res.on("finish", () => {
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(cors());
  router.use(decodeToken);
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use("/api/notes", notesRouter);
  router.use("/api/users", usersRouter);
  router.get("/ping", (req, res) => res.status(200).json({ hello: "world" }));

  router.use((req, res) => {
    const error = new Error("Route not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });
  router.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
  });
};

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));
