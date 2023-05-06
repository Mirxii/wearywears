import { CircularProgress, Container, List, Stack } from '@mui/material';
import { getListings } from '../../api/Listings';
import { useQuery } from 'react-query';
import ListingsItem from './ListingsItem';

interface Listing {
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
}

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
    <Stack sx={{ p: 8 }}>
      {data.map((listing: Listing) => (
        <ListingsItem
          key={listing.id}
          id={listing.id}
          title={listing.title}
          description={listing.description}
          image={listing.image}
          location={listing.location}
          price={listing.price}
          postedById={listing.postedById}
          postedBy={listing.postedBy}
        />
      ))}
    </Stack>
  );
};

export default ListingsContainer;
