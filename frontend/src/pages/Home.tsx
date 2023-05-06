import { Container, Typography } from '@mui/material';

import ListingsContainer from '../components/listings/ListingsContainer';
import SearchBar from '../components/search/SearchBar';

const Home = () => {
  return (
    <Container>
      <SearchBar />
      <ListingsContainer />
    </Container>
  );
};

export default Home;
