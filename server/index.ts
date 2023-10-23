import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { config } from "./src/config/config";
import Logging from "./src/utils/logging";
import { decodeToken } from "./src/middleware/auth";
import { notesRouter } from "./src/routes/note.router";
import { usersRouter } from "./src/routes/user.router";

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

  router.use("/notes", notesRouter);
  router.use("/users", usersRouter);
  router.get("/ping", (req, res) => res.status(200).json({ hello: "world" }));

  router.use((req, res) => {
    const error = new Error("Route not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });
  router.listen(config.server.port, "0.0.0.0", () => {
    console.log(`Server running on port ${config.server.port}`);
  });
};

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));
