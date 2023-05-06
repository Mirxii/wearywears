import { CircularProgress, Container, List, Typography } from '@mui/material';
import { getListings } from '../../api/Listings';
import { useQuery } from 'react-query';

type Listing = {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  postedById: string;
  postedBy: {
    id: string;
    name: string;
    email: string;
  };
};

const ListingsContainer = () => {
  const { isLoading, error, data } = useQuery('listingsData', () =>
    getListings()
  );

  console.log(data);

  if (isLoading)
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    );

  if (error) {
    console.log(error);
    return <Container sx={{ bgcolor: 'red' }}>Error</Container>;
  }

  return (
    <Container sx={{ bgcolor: 'slategray', p: 2 }}>
      {data.map((listing: Listing) => (
        <List key={listing.id} sx={{ border: 1, p: 1 }}>
          <Typography>{listing.title}</Typography>
        </List>
      ))}
    </Container>
  );
};

export default ListingsContainer;
