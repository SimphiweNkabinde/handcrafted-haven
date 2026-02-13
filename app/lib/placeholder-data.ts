import { Product, ProductCategory } from "./definitions";

const productCategories: ProductCategory[] = [
  {
    id: "7B2F1A84-E129-4A92-BD83-C7E14920B6D5",
    name: "Kitchen & Dining",
    description: "Functional art for the heart of the home, ranging from hand-thrown ceramics to artisan-carved woodware."
  },
  {
    id: "A9C30E12-4B6F-48D1-9524-8D72B3A1C904",
    name: "Home Textiles",
    description: "Ethically sourced and hand-woven fabrics, including throws, pillows, and rugs dyed with organic pigments."
  },
  {
    id: "F5E1D2C3-0A9B-4C8D-8E7F-6A5B4C3D2E1F",
    name: "Lighting & Decor",
    description: "Bespoke interior accents and lighting fixtures handcrafted from copper, brass, and recycled glass."
  },
  {
    id: "2D8A4C19-5E7B-4F02-BC13-9A8D7E6C5B4A",
    name: "Stationery & Paper Goods",
    description: "Fine writing tools and leather-bound journals designed for creators, poets, and daily reflection."
  },
  {
    id: "BD92F1A0-7C6D-4E3B-AF5E-2D1C0B9A8F7E",
    name: "Lifestyle & Accessories",
    description: "Small-batch personal goods that combine traditional craftsmanship with modern utility."
  }
];

const products: Product[] = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Midnight Glaze Ceramic Bowl",
    short_description: "A deep-blue, wheel-thrown stoneware bowl with a unique reactive glaze.",
    long_description: "This bowl is individually thrown on a potter's wheel using high-fire stoneware clay. It features a proprietary 'Midnight' reactive glaze that mimics the starry night sky, creating one-of-a-kind patterns on every piece. It is microwave and dishwasher safe.",
    price: 45.00,
    image_url: "",
    category_id: productCategories[0].id
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Heritage Oak Cutting Board",
    short_description: "Heavy-duty end-grain cutting board made from reclaimed white oak.",
    long_description: "Crafted from century-old barn wood, this end-grain board is designed to protect your knife edges while providing a sturdy surface for heavy prep work. Each board is seasoned with food-grade mineral oil and beeswax.",
    price: 78.00,
    image_url: "",
    category_id: productCategories[0].id
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Hand-Woven Indigo Throw",
    short_description: "100% organic cotton throw blanket dyed with natural plant-based indigo.",
    long_description: "Woven on traditional floor looms, this throw features a subtle herringbone pattern. The cotton is hand-dyed in small batches using fermented indigo leaves, resulting in a rich, living color that develops a beautiful patina over time.",
    price: 120.00,
    image_url: "",
    category_id: productCategories[1].id
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Copper-Etched Wall Sconce",
    short_description: "Hammered copper light fixture with hand-etched botanical motifs.",
    long_description: "Bring warmth to any room with this solid copper sconce. The metal is hand-hammered into shape and then meticulously etched with intricate floral patterns. When lit, the etchings cast soft, artistic shadows across the wall.",
    price: 195.00,
    image_url: "",
    category_id: productCategories[2].id
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Saddle-Stitched Leather Journal",
    short_description: "Full-grain leather notebook cover with refillable hand-stitched pages.",
    long_description: "Made from vegetable-tanned leather, every seam of this journal is hand-sewn using the traditional saddle-stitch technique. It includes 200 pages of acid-free, cream-toned paper perfect for fountain pens.",
    price: 62.00,
    image_url: "",
    category_id: productCategories[4].id
  }
];

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'user',
    email: 'user@email.com',
    password: 'user@123',
  },
];



export { products, productCategories, users }