import express from 'express';

const listingRouter = express.Router();

listingRouter.get('/', (req, res) => {
  res.send('OK');
});

listingRouter.get('/:id', (req, res) => {
  res.send('OK');
});

listingRouter.post('/', (req, res) => {
  res.send('OK');
});

listingRouter.put('/:id', (req, res) => {
  res.send('OK');
});

listingRouter.delete('/:id', (req, res) => {
  res.send('OK');
});

export default listingRouter;
