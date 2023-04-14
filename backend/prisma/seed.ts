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
  categoryId: UUID;
};

type Category = {
  id: UUID;
  name: string;
};

const users: User[] = [
  {
    id: randomUUID(),
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password',
  },
];

const Categories: Category[] = [
  {
    id: randomUUID(),
    name: 'Tops',
  },
  {
    id: randomUUID(),
    name: 'Bottoms',
  },
  {
    id: randomUUID(),
    name: 'Shoes',
  },
  {
    id: randomUUID(),
    name: 'Accessories',
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
    categoryId: Categories[0].id,
  },
  {
    id: randomUUID(),
    title: 'Black jeans',
    description: 'Black jeans for sale',
    location: 'Tampere',
    price: 10,
    postedById: users[0].id,
    categoryId: Categories[1].id,
  },
  {
    id: randomUUID(),
    title: 'White shoes',
    description: 'White shoes for sale',
    location: 'Helsinki',
    price: 15,
    postedById: users[0].id,
    categoryId: Categories[2].id,
  },
  {
    id: randomUUID(),
    title: 'Black hat',
    description: 'Black hat for sale',
    location: 'Tampere',
    price: 5,
    postedById: users[0].id,
    categoryId: Categories[3].id,
  },
];

async function seed() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.category.createMany({
    data: Categories,
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
