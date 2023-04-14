import express from 'express';

const listingRouter = express.Router();

listingRouter.get('/', (req, res) => {
  res.send('OK');
});

export default listingRouter;
