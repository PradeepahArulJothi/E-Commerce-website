import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

/*
  Product data
  7 categories × 8 products = 56 products
*/

const products = [
  // =========================
  // MEN'S WEAR
  // =========================
  {
    name: "Classic Cotton Casual Shirt",
    category: "Men's Wear",
    price: 999,
    description: "Comfortable cotton casual shirt for everyday wear.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    stock: 20,
    featured: true
  },
  {
    name: "Premium Formal Shirt",
    category: "Men's Wear",
    price: 1299,
    description: "Elegant formal shirt suitable for office and business occasions.",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
    stock: 20,
    featured: true
  },
  {
    name: "Slim Fit Denim Jeans",
    category: "Men's Wear",
    price: 1599,
    description: "Stylish slim-fit denim jeans designed for everyday comfort.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    stock: 20,
    featured: false
  },
  {
    name: "Classic Polo T-Shirt",
    category: "Men's Wear",
    price: 899,
    description: "Comfortable polo T-shirt with a classic casual design.",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d",  
    stock: 20,
    featured: false
  },
  {
    name: "Men's Casual Chinos",
    category: "Men's Wear",
    price: 1399,
    description: "Versatile chinos perfect for casual and semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    stock: 20,
    featured: false
  },
  {
    name: "Men's Lightweight Jacket",
    category: "Men's Wear",
    price: 2199,
    description: "Lightweight jacket suitable for casual outdoor activities.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    stock: 20,
    featured: false
  },
  {
    name: "Traditional Men's Kurta",
    category: "Men's Wear",
    price: 1199,
    description: "Traditional kurta designed for festive and special occasions.",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0",
    stock: 20,
    featured: false
  },
  {
    name: "Premium Men's Blazer",
    category: "Men's Wear",
    price: 2999,
    description: "Smart premium blazer for formal events and celebrations.",
    image: "https://images.unsplash.com/photo-1555069519-127aadedf1ee",
    stock: 20,
    featured: false
  },

  // =========================
  // WOMEN'S WEAR
  // =========================
  {
    name: "Elegant Designer Saree",
    category: "Women's Wear",
    price: 1999,
    description: "Elegant saree suitable for festive occasions and celebrations.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    stock: 20,
    featured: true
  },
  {
    name: "Women's Cotton Kurti",
    category: "Women's Wear",
    price: 899,
    description: "Comfortable cotton kurti for everyday and casual wear.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    stock: 20,
    featured: true
  },
  {
    name: "Floral Summer Dress",
    category: "Women's Wear",
    price: 1299,
    description: "Beautiful floral dress designed for a comfortable summer look.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Casual Top",
    category: "Women's Wear",
    price: 699,
    description: "Stylish casual top suitable for everyday outings.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Palazzo Pants",
    category: "Women's Wear",
    price: 999,
    description: "Comfortable wide-leg palazzo pants with a modern style.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Handbag",
    category: "Women's Wear",
    price: 1499,
    description: "Stylish handbag with enough space for daily essentials.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Salwar Suit",
    category: "Women's Wear",
    price: 1799,
    description: "Beautiful salwar suit designed for traditional occasions.",
    image: "https://picsum.photos/seed/womens-salwar-suit/600/600",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Denim Jacket",
    category: "Women's Wear",
    price: 1599,
    description: "Trendy denim jacket for casual everyday styling.",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    stock: 20,
    featured: false
  },

  // =========================
  // ELECTRONICS
  // =========================
  {
    name: "Smartphone Pro X",
    category: "Electronics",
    price: 24999,
    description: "Modern smartphone with powerful performance and premium design.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    stock: 20,
    featured: true
  },
  {
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1999,
    description: "Wireless headphones delivering clear sound and comfortable listening.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 20,
    featured: true
  },
  {
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 2999,
    description: "Smart watch with fitness tracking and everyday smart features.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 20,
    featured: false
  },
  {
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    description: "Portable speaker with powerful sound for indoor and outdoor use.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    stock: 20,
    featured: false
  },
  {
    name: "Ultra Slim Laptop",
    category: "Electronics",
    price: 54999,
    description: "Slim and powerful laptop designed for work and entertainment.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    stock: 20,
    featured: false
  },
  {
    name: "Fast Charge Power Bank",
    category: "Electronics",
    price: 1299,
    description: "Portable power bank with fast charging support.",
   image: "https://picsum.photos/seed/fast-charge-power-bank/600/600",
    stock: 20,
    featured: false
  },
  {
    name: "Wireless Mechanical Keyboard",
    category: "Electronics",
    price: 2499,
    description: "Wireless mechanical keyboard designed for productivity and gaming.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 20,
    featured: false
  },
  {
    name: "Ergonomic Wireless Mouse",
    category: "Electronics",
    price: 999,
    description: "Comfortable wireless mouse for work, study and everyday computing.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 20,
    featured: false
  },

  // =========================
  // GIFT ITEMS
  // =========================
  {
    name: "Cute Teddy Bear",
    category: "Gift Items",
    price: 799,
    description: "Soft and adorable teddy bear suitable for gifting.",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11",
    stock: 20,
    featured: true
  },
  {
    name: "Premium Gift Hamper",
    category: "Gift Items",
    price: 1499,
    description: "Beautifully arranged gift hamper for special occasions.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
    stock: 20,
    featured: true
  },
  {
    name: "Decorative Photo Frame",
    category: "Gift Items",
    price: 599,
    description: "Elegant decorative photo frame for memorable moments.",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a",
    stock: 20,
    featured: false
  },
  {
    name: "Personalized Coffee Mug",
    category: "Gift Items",
    price: 499,
    description: "Classic coffee mug suitable for personalized gifting.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    stock: 20,
    featured: false
  },
  {
    name: "Luxury Perfume Gift Set",
    category: "Gift Items",
    price: 1899,
    description: "Elegant perfume gift set suitable for special celebrations.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    stock: 20,
    featured: false
  },
  {
    name: "Greeting Card Collection",
    category: "Gift Items",
    price: 299,
    description: "Beautiful greeting card collection for different occasions.",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
    stock: 20,
    featured: false
  },
  {
    name: "Personalized Keychain",
    category: "Gift Items",
    price: 349,
    description: "Simple personalized keychain perfect for gifting.",
    image: "https://picsum.photos/seed/personalized-keychain/600/600",
    stock: 20,
    featured: false
  },
  {
    name: "Elegant Gift Box",
    category: "Gift Items",
    price: 699,
    description: "Decorative gift box for birthdays and celebrations.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
    stock: 20,
    featured: false
  },

  // =========================
  // KIDS COLLECTIONS
  // =========================
  {
    name: "Kids Cotton T-Shirt",
    category: "Kids Collections",
    price: 499,
    description: "Soft cotton T-shirt designed for comfortable kids' wear.",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
    stock: 20,
    featured: true
  },
  {
    name: "Girls Floral Frock",
    category: "Kids Collections",
    price: 799,
    description: "Colorful floral frock designed for girls.",
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42",
    stock: 20,
    featured: true
  },
  {
    name: "Kids School Backpack",
    category: "Kids Collections",
    price: 899,
    description: "Lightweight school backpack with a spacious design.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    stock: 20,
    featured: false
  },
  {
    name: "Kids Sports Shoes",
    category: "Kids Collections",
    price: 999,
    description: "Comfortable sports shoes for active children.",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782",
    stock: 20,
    featured: false
  },
  {
    name: "Remote Control Toy Car",
    category: "Kids Collections",
    price: 1199,
    description: "Fun remote control toy car for children.",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
    stock: 20,
    featured: false
  },
  {
    name: "Building Blocks Set",
    category: "Kids Collections",
    price: 699,
    description: "Creative building blocks set for learning and fun.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    stock: 20,
    featured: false
  },
  {
    name: "Kids Doll Collection",
    category: "Kids Collections",
    price: 899,
    description: "Colorful doll collection designed for imaginative play.",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
    stock: 20,
    featured: false
  },
  {
    name: "Colorful Kids Watch",
    category: "Kids Collections",
    price: 599,
    description: "Fun and colorful watch designed especially for kids.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    stock: 20,
    featured: false
  },

  // =========================
  // COOKERY ITEMS
  // =========================
  {
    name: "Non Stick Frying Pan",
    category: "Cookery Items",
    price: 899,
    description: "Durable non-stick frying pan for everyday cooking.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
    stock: 20,
    featured: true
  },
  {
    name: "Stainless Steel Pressure Cooker",
    category: "Cookery Items",
    price: 1499,
    description: "Durable pressure cooker for quick and efficient cooking.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62",
    stock: 20,
    featured: true
  },
  {
    name: "Ceramic Dinner Set",
    category: "Cookery Items",
    price: 2199,
    description: "Elegant ceramic dinner set for everyday meals and occasions.",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0",
    stock: 20,
    featured: false
  },
  {
    name: "Professional Knife Set",
    category: "Cookery Items",
    price: 1299,
    description: "Kitchen knife set for chopping, slicing and everyday cooking.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546",
    stock: 20,
    featured: false
  },
  {
    name: "Stainless Steel Mixing Bowls",
    category: "Cookery Items",
    price: 799,
    description: "Durable mixing bowl set for baking and cooking.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    stock: 20,
    featured: false
  },
  {
    name: "Electric Kitchen Kettle",
    category: "Cookery Items",
    price: 1199,
    description: "Fast heating electric kettle for everyday kitchen use.",
    image: "https://picsum.photos/seed/electric-kitchen-kettle/600/600",
    stock: 20,
    featured: false
  },
  {
    name: "Insulated Lunch Box",
    category: "Cookery Items",
    price: 699,
    description: "Compact insulated lunch box for office and school.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    stock: 20,
    featured: false
  },
  {
    name: "Stainless Steel Water Bottle",
    category: "Cookery Items",
    price: 599,
    description: "Reusable stainless steel water bottle for everyday use.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    stock: 20,
    featured: false
  },

  // =========================
  // BAG COLLECTIONS
  // =========================
  {
    name: "Premium Laptop Backpack",
    category: "Bag Collections",
    price: 1799,
    description: "Spacious laptop backpack designed for work and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 20,
    featured: true
  },
  {
    name: "Classic Leather Handbag",
    category: "Bag Collections",
    price: 2499,
    description: "Elegant handbag with a premium classic design.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 20,
    featured: true
  },
  {
    name: "Travel Duffel Bag",
    category: "Bag Collections",
    price: 1999,
    description: "Spacious duffel bag designed for weekend and travel use.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 20,
    featured: false
  },
  {
    name: "Women's Sling Bag",
    category: "Bag Collections",
    price: 999,
    description: "Compact sling bag for everyday outings.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    stock: 20,
    featured: false
  },
  {
    name: "Canvas Tote Bag",
    category: "Bag Collections",
    price: 699,
    description: "Reusable canvas tote bag for shopping and daily activities.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363",
    stock: 20,
    featured: false
  },
  {
    name: "Compact Crossbody Bag",
    category: "Bag Collections",
    price: 899,
    description: "Stylish crossbody bag for carrying daily essentials.",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d",
    stock: 20,
    featured: false
  },
  {
    name: "Water Resistant Backpack",
    category: "Bag Collections",
    price: 1599,
    description: "Water resistant backpack suitable for travel and outdoor use.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
    stock: 20,
    featured: false
  },
  {
    name: "Classic Travel Wallet",
    category: "Bag Collections",
    price: 599,
    description: "Compact travel wallet for cards, cash and important documents.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    stock: 20,
    featured: false
  }
];

/*
  Connect to MongoDB
*/
await mongoose.connect(process.env.MONGODB_URI);

/*
  Remove existing products
  This keeps the same functionality as your
  original seed.js
*/
await Product.deleteMany({});

/*
  Insert the new products
*/
await Product.insertMany(products);

console.log(`${products.length} products inserted successfully`);

/*
  Disconnect from MongoDB
*/
await mongoose.disconnect();