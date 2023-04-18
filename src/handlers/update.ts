import { resolveSoa } from "dns";
import { Request, Response } from "express";
import prisma from "../db";

export const getOneUpdate = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const data = await prisma?.update.findUnique({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ code: 200, data: data });
  } catch (error: any) {
    res.status(400).json({ code: 400, error: error.meta.cause });
  }
};

export const getUpdates = async (
  req: Request,
  res: Response,
  next: Function
) => {
  // const updates = prisma.update
  try {
    let products = await prisma.product.findMany({
      where: {
        belongsToId: req.params.id,
      },
      include: {
        Update: true,
      },
    });
    const updates = products.reduce((allupdates: any, curentProduct: any) => {
      return [...allupdates, ...curentProduct.Update];
    }, []);
    res.status(200).json({ code: 200, data: updates });
  } catch (error: any) {
    res.status(400).json({ code: 400, error: error.meta.cause });
  }
};

export const createUpdate = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { body, title, productID } = req.body;
  console.log(body, title, productID);
  try {
    let product = await prisma.product.findUnique({
      where: {
        id: req.body.productID,
      },
    });

    if (!product)
      return res
        .status(400)
        .json({ code: 400, error: " error creating update " });

    /// let update = await prisma.update.create({
    //   data: {
    //     body,
    //     title,
    //     productID,
    //   },
    // });

    let update = await prisma.update.create({
      data: {
        body,
        title,
        product: { connect: { id: product.id } },
      },
    });

    return res.status(201).json({ code: 201, data: update });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ code: 400, error: error?.meta?.cause });
  }
};

export const updateUpdate = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let products = await prisma.product.findMany({
      where: {
        belongsToId: req.body.id,
      },
      include: {
        Update: true,
      },
    });

    const updates = products.reduce((allupdates: any, curentProduct: any) => {
      return [...allupdates, ...curentProduct?.Update];
    }, []);

    let match = updates.find((update) => update.id == req.params.id); //check for match in user data
    if (!match)
      return res
        .status(400)
        .json({ code: 400, error: "could not update or no data toupdate" });
    let updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).json({ code: 200, data: updatedUpdate });
  } catch (error: any) {
    res.status(400).json({ code: 400, error: error?.meta?.cause });
  }
};

export const deleteUpdate = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    console.log("delete");
    let products = await prisma.product.findMany({
      where: {
        belongsToId: req.body.id,
      },
      include: {
        Update: true,
      },
    });

    const updates = products.reduce((allupdates: any, curentProduct: any) => {
      return [...allupdates, ...curentProduct?.Update];
    }, []);

    let match = updates.find((update) => update.id == req.params.id); //check for match in user data
    if (!match)
      return res
        .status(400)
        .json({ code: 400, error: "could not delete or no data delete" });
    let deleteUpdate = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ code: 200, data: deleteUpdate });
  } catch (error: any) {
    res.status(400).json({ code: 400, error: error?.meta?.cause });
  }
};
