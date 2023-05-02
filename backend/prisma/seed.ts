import { PrismaClient } from '@prisma/client';
import { UUID, randomUUID } from 'crypto';

const prisma = new PrismaClient();

type User = {
  id: UUID;
  name: string;
  email: string;
  password: string;
};

type Listing = {
  id: UUID;
  title: string;
  description: string;
  location: string;
  image: string;
  price: number;
  postedById: UUID;
  category: Category;
};

enum Category {
  SHIRTS = 'SHIRTS',
  JACKETS = 'JACKETS',
  PANTS = 'PANTS',
  SHORTS = 'SHORTS',
  SKIRTS = 'SKIRTS',
  DRESSES = 'DRESSES',
  SHOES = 'SHOES',
  HATS = 'HATS',
  ACCESSORIES = 'ACCESSORIES',
  OTHER = 'OTHER',
}

const users: User[] = [
  {
    id: randomUUID(),
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password',
  },
];

const Listings: Listing[] = [
  {
    id: randomUUID(),
    title: 'Brown jacket',
    description: 'Brown jacket for sale',
    location: 'Helsinki',
    image:
      'https://beamhill.fi/wp-content/uploads/2023/02/Lemaire-BOXY-JACKET-Dark-Brown.jpg',
    price: 20,
    postedById: users[0].id,
    category: Category.JACKETS,
  },
  {
    id: randomUUID(),
    title: 'Black jeans',
    description: 'Black jeans for sale',
    location: 'Tampere',
    image:
      'https://static.massimodutti.net/3/photos//2023/V/0/2/p/0045/025/800/0045025800_1_1_16.jpg',
    price: 10,
    postedById: users[0].id,
    category: Category.PANTS,
  },
  {
    id: randomUUID(),
    title: 'White shoes',
    description: 'White shoes for sale',
    location: 'Helsinki',
    image:
      'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1673469712-4-1673469708.png',
    price: 15,
    postedById: users[0].id,
    category: Category.SHOES,
  },
  {
    id: randomUUID(),
    title: 'Black hat',
    description: 'Black hat for sale',
    location: 'Tampere',
    image:
      'https://img.freepik.com/free-photo/black-cap-front-view-isolated_125540-1019.jpg',
    price: 5,
    postedById: users[0].id,
    category: Category.HATS,
  },
];

async function seed() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.listing.createMany({
    data: Listings,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
