import express from 'express';

import { verifyToken } from '../middleware/verifyToken';

import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from '../controllers/listings';

const listingRouter = express.Router();

listingRouter.get('/', getAllListings);

listingRouter.get('/:id', getListingById);

listingRouter.use(verifyToken);

listingRouter.post('/', createListing);

listingRouter.put('/:id', updateListing);

listingRouter.delete('/:id', deleteListing);

export default listingRouter;
