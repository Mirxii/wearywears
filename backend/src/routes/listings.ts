import express from 'express';

import {
  getAllListings,
  getListingById,
  createListing,
} from '../controllers/listings';

const listingRouter = express.Router();

listingRouter.get('/', getAllListings);

listingRouter.get('/:id', getListingById);

listingRouter.post('/', createListing);

listingRouter.put('/:id', (req, res) => {
  res.send('OK');
});

listingRouter.delete('/:id', (req, res) => {
  res.send('OK');
});

export default listingRouter;
