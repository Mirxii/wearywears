import { useState } from 'react';

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSorting, setSearchSorting] = useState('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(searchQuery);
    console.log(searchCategory);
    console.log(searchSorting);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchCategoryChange = (e: SelectChangeEvent<string>) => {
    setSearchCategory(e.target.value as string);
  };

  const handleSearchSortingChange = (e: SelectChangeEvent<string>) => {
    setSearchSorting(e.target.value as string);
  };

  return (
    <Container
      component="form"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        justifyContent: 'center',
        border: 1,
        borderRadius: 2,
        borderColor: 'primary.main',
        mt: 2,
      }}
      onSubmit={handleSearchSubmit}
    >
      <FormControl fullWidth>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </FormControl>
      <FormControl
        sx={{
          minWidth: {
            xs: 100,
            sm: 120,
            md: 180,
          },
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={searchCategory}
          onChange={handleSearchCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="SHIRTS">Shirts</MenuItem>
          <MenuItem value="JACKETS">Jackets</MenuItem>
          <MenuItem value="PANTS">Pants</MenuItem>
          <MenuItem value="SHORTS">Shorts</MenuItem>
          <MenuItem value="SKIRTS">Skirts</MenuItem>
          <MenuItem value="DRESSES">Dresses</MenuItem>
          <MenuItem value="SHOES">Shoes</MenuItem>
          <MenuItem value="HATS">Hats</MenuItem>
          <MenuItem value="ACCESSORIES">Accessories</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          minWidth: {
            xs: 100,
            sm: 120,
            md: 180,
          },
        }}
      >
        <InputLabel>Sorting</InputLabel>
        <Select
          label="Sorting"
          value={searchSorting}
          onChange={handleSearchSortingChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ASC">Price: Low to High</MenuItem>
          <MenuItem value="DESC">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        sx={{
          px: 4,
        }}
      >
        Search
      </Button>
    </Container>
  );
};

export default SearchBar;
