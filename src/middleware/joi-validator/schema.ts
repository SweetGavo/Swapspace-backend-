import joi from "joi";
import { Request, Response } from "express";
export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
export const joi_createAgent = async (
  req: Request,
  res: Response,
  next: Function
) => {
  let schema = joi.object({
    name: joi.string().required().min(4),
    password: joi.string().min(4).required(),
    email: joi.string().min(4).required(),
    isSubscribed: joi.boolean().required(),
    agent_id: joi.string().required(),
    agent_bio_id: joi.string().required(),
    agent_subscription_id: joi.string().required(),
  });
  const check = schema.validate(req.body, option);
  if (check.error) {
    return res.status(400).json({ code: 400, error: check.error.message });
  } else {
    next();
  }
};
