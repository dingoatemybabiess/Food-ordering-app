const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env.local' });

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
);

if (Object.keys(serviceAccount).length === 0) {
  console.error('Error: FIREBASE_SERVICE_ACCOUNT_KEY is missing in .env.local');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const menuItems = [
  {
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese.',
    price: 12.99,
    category: 'Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    available: true,
  },
  {
    name: 'Cheese Burger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, and tomato.',
    price: 8.99,
    category: 'Burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    available: true,
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.',
    price: 9.50,
    category: 'Salad',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    available: true,
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta with egg, hard cheese, cured pork, and black pepper.',
    price: 14.50,
    category: 'Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-98280d8399a4',
    available: true,
  },
  {
    name: 'Sushi Platter',
    description: 'Assorted fresh sushi rolls and nigiri.',
    price: 22.00,
    category: 'Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    available: true,
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 6.99,
    category: 'Dessert',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
    available: true,
  }
];

async function seed() {
  const batch = db.batch();
  const collectionRef = db.collection('menuItems');

  for (const item of menuItems) {
    const docRef = collectionRef.doc();
    batch.set(docRef, item);
  }

  await batch.commit();
  console.log('Database seeded successfully with menu items!');
}

seed().catch(console.error);
