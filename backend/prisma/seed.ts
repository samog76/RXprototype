import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const email = 'admin@riba-x.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  let adminUser = existingAdmin;
  if (existingAdmin) {
    console.log('Admin user already exists. Skipping admin creation.');
  } else {
    const passwordHash = await bcrypt.hash('AdminPassword123!', 10);
    const admin = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.ADMIN,
        isVerified: true,
        profile: {
          create: {
            displayName: 'System Admin',
            bio: 'Administrator account for Riba-X',
          }
        }
      },
    });
    console.log(`Admin user created: ${admin.email}`);
    console.log(`Password: AdminPassword123!`);
    adminUser = admin;
  }

  // Seed Categories
  console.log('Seeding categories...');
  const categoriesData = [
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets and tech' },
    { name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories' },
    { name: 'Home', slug: 'home', description: 'Home decor and furniture' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Seed Products
  console.log('Seeding products...');
  const electronicsCat = await prisma.category.findUnique({ where: { slug: 'electronics' } });
  const fashionCat = await prisma.category.findUnique({ where: { slug: 'fashion' } });

  const productsData = [
    {
      name: 'Wireless Noise-Canceling Headphones',
      slug: 'wireless-headphones',
      description: 'Premium over-ear headphones with active noise cancellation.',
      price: 299.99,
      inventory: 50,
      categoryId: electronicsCat!.id,
      sellerId: adminUser!.id,
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', isPrimary: true }]
      }
    },
    {
      name: 'Minimalist Mechanical Keyboard',
      slug: 'mechanical-keyboard',
      description: 'Compact wireless mechanical keyboard with tactile switches.',
      price: 149.99,
      inventory: 120,
      categoryId: electronicsCat!.id,
      sellerId: adminUser!.id,
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop', isPrimary: true }]
      }
    },
    {
      name: 'Classic Denim Jacket',
      slug: 'classic-denim-jacket',
      description: 'Vintage wash denim jacket for everyday wear.',
      price: 89.99,
      inventory: 200,
      categoryId: fashionCat!.id,
      sellerId: adminUser!.id,
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop', isPrimary: true }]
      }
    }
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
