import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import Logging from "../utils/logging";
import { Note } from "../models/note.models";
import { User } from "../models/user.models";

const validateJoi =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      Logging.error(err);
      res.status(422).send({ err });
    }
  };

const Schemas = {
  note: {
    create: Joi.object<Note>({
      body: Joi.string().required(),
    }),
    update: Joi.object<Note>({
      body: Joi.string().required(),
    }),
  },
  user: {
    create: Joi.object<User>({
      email: Joi.string()
        .regex(
          /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .required(),
      name: Joi.string()
        .regex(/^[a-z ,.'-]+$/i)
        .required(),
      _id: Joi.string().required(),
    }),
  },
};

export { Schemas, validateJoi };
