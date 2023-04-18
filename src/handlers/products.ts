import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../db";

// Get all by UserId  that belongs to user
export const getAllProduct = async (req: JwtPayload, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });

    res.status(200).json({ code: 200, data: user?.products });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      error: "somethin went wrong",
    });
  }
};

// get A product by ProductId
export const getProdut = async (req: JwtPayload, res: Response) => {
  try {
    const ProductId = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id: ProductId,
        belongsToId: req.user.id,
      },
    });

    res.status(200).json({ code: 200, data: product });
  } catch (error) {
    res.status(400).json({ code: 400, error: "no product" });
  }
};
// create a product
export const createProduct = async (req: JwtPayload, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.status(201).json({ code: 201, data: product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, error: "couldn't create " });
  }
};
// update a product
export const updateProdut = async (req: JwtPayload, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });
    res.status(200).json({ code: 200, data: product });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ code: 400, error: error.meta.cause });
  }
};

export const deleteProduct = async (req: JwtPayload, res: Response) => {
  try {
    const deletedta = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });
    res.status(200).json({ code: 200, data: deletedta });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ code: 400, error: error.meta.cause });
  }
};
