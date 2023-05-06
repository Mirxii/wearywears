import { Container, Typography } from '@mui/material';

import ListingsContainer from '../components/listings/ListingsContainer';

const Home = () => {
  return (
    <Container sx={{ gap: 10 }}>
      <Container sx={{ bgcolor: 'darkslategray', p: 2 }}>
        <Typography>Search</Typography>
      </Container>
      <ListingsContainer />
    </Container>
  );
};

export default Home;
