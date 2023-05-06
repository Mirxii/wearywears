import { Container, List, ListItem, Typography, Box } from '@mui/material';

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

const ListingsItem = (props: Listing) => {
  return (
    <ListItem
      sx={{
        border: 1,
        borderRadius: 2,
        p: 2,
        mb: 4,
      }}
    >
      <Box
        component="img"
        sx={{
          maxHeight: 1 / 5,
          width: 1 / 5,
        }}
        src={props.image}
        alt={props.title}
      />
      <Container>
        <List>
          <Typography variant="h4">{props.title}</Typography>
          <Typography>{props.description}</Typography>
          <Typography>{props.location}</Typography>
          <Typography>{props.price} €</Typography>
        </List>
      </Container>
    </ListItem>
  );
};

export default ListingsItem;
