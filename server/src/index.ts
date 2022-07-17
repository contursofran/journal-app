import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { config } from "./config/config";
import Logging from "./utils/logging";
import { decodeToken } from "./utils/middleware";
import notesRouter from "./routes/note.router";

const router = express();

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(decodeToken);
  router.use(cors());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use("/api/notes", notesRouter);
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" })
  );

  router.use((req, res, next) => {
    const error = new Error("Not found");

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
