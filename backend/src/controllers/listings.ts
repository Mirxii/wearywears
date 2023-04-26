import prisma from '../db/prismaClient';
import { Request, Response } from 'express';
import { Listing } from '@prisma/client';

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings: Listing[] = await prisma.listing.findMany();

    return res.json(listings);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: String(id),
      },
    });

    res.json(listing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
