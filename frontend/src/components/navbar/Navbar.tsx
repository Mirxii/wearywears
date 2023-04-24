import { Container, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', p: 2, gap: 2 }}>
      <Link component={RouterLink} to="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link component={RouterLink} to="/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link component={RouterLink} to="/signup">
        <Button variant="contained">Signup</Button>
      </Link>
    </Container>
  );
};

export default Navbar;
