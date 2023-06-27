import prisma from "../db";
import { Request, Response } from "express";
import { createToken, hashPassword } from "../middleware/auth/auth";
import { agent } from "supertest";
export const createAgent = async (
  req: Request | any,
  res: Response | any,
  next: any
) => {
  try {
    const {
      name,
      password,
      email,
      isSubscribed,
      agent_id,
      agent_bio_id,
      agent_subscription_id,
    } = req.body;
    const agent = await prisma.agent.create({
      data: {
        email,
        name,
        isSubscribed,
        password: await hashPassword(password),
        agent_id,
        agent_bio_id,
        agent_subscription_id,
      },
    });
    const userToken = await createToken(agent);
    return res.status(201).json({ code: 201, token: userToken });
  } catch (error: any) {
    console.log(error);
    next({
      code: 400,
      error: "internal server error",
    });
  }
};

export const allAgent = async (
  req: Request | any,
  res: Response | any,
  next: any
) => {
  try {
    const agents = await prisma.agent.findMany();
    res.status(200).json({ code: 200, data: agents });
  } catch (error: any) {
    next({
      code: 400,
      error: "internal server error",
    });
  }
};

export const test = async (
  req: Request | any,
  res: Response | any,
  next: any
) => {
  try {
    // const agents = await prisma.agent.findMany();
    res.status(200).json({ code: 200, data: {} });
  } catch (error: any) {
    next({
      code: 400,
      error: "internal server error",
    });
  }
};
