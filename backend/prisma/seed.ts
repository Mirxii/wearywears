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
    price: 20,
    postedById: users[0].id,
    category: Category.JACKETS,
  },
  {
    id: randomUUID(),
    title: 'Black jeans',
    description: 'Black jeans for sale',
    location: 'Tampere',
    price: 10,
    postedById: users[0].id,
    category: Category.PANTS,
  },
  {
    id: randomUUID(),
    title: 'White shoes',
    description: 'White shoes for sale',
    location: 'Helsinki',
    price: 15,
    postedById: users[0].id,
    category: Category.SHOES,
  },
  {
    id: randomUUID(),
    title: 'Black hat',
    description: 'Black hat for sale',
    location: 'Tampere',
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
