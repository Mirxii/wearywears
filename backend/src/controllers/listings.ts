import prisma from '../db/prismaClient';
import { z } from 'zod';

import { Request, Response } from 'express';
import { Listing, Prisma, category } from '@prisma/client';

import { listingSchema } from '../schemas/listings';

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const { searchString, searchCategory, skip, take, orderBy } = req.query;

    const or: Prisma.ListingWhereInput = searchString
      ? {
          OR: [
            {
              title: { contains: searchString as string, mode: 'insensitive' },
            },
            {
              description: {
                contains: searchString as string,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const listings: Listing[] = await prisma.listing.findMany({
      where: {
        category: searchCategory as category,
        ...or,
      },
      include: { postedBy: true },
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      orderBy: {
        price: orderBy as Prisma.SortOrder,
      },
    });

    res.json(listings);
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

export const createListing = async (req: Request, res: Response) => {
  try {
    const { title, description, price, location, category, image, postedById } =
      req.body;

    listingSchema.parse({
      title,
      description,
      price,
      location,
      category,
      image,
      postedById,
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        location,
        category,
        image,
        postedBy: { connect: { id: postedById } },
      },
    });

    res.json(listing);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }
    res.status(500).json({ error: error.message });
  }
};
