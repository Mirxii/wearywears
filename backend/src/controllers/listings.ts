import prisma from '../db/prismaClient';
import { Request, Response } from 'express';
import { Listing } from '@prisma/client';

export const getAllListings = async (req: Request, res: Response) => {
  const listings: Listing[] = await prisma.listing.findMany();

  res.json(listings);
};

export const getListingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await prisma.listing.findUnique({
    where: {
      id: String(id),
    },
  });

  res.json(listing);
};
