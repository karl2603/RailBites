/* data.js */
export const restaurants = [
  {
    id: 1,
    name: "Spice Junction",
    rating: 4.8,
    cuisine: "North Indian, Mughlai",
    time: "25 min",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: false
  },
  {
    id: 2,
    name: "The Royal Tiffin",
    rating: 4.6,
    cuisine: "South Indian, Pure Veg",
    time: "15 min",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: 3,
    name: "Biryani Blues",
    rating: 4.5,
    cuisine: "Hyderabadi, Biryani",
    time: "35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: false
  },
  {
    id: 4,
    name: "Punjab Da Tadka",
    rating: 4.3,
    cuisine: "Punjabi, Tandoor",
    time: "30 min",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: false
  },
  {
    id: 5,
    name: "Green Bowl",
    rating: 4.7,
    cuisine: "Healthy, Salad",
    time: "20 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: 6,
    name: "Chai & Chaat",
    rating: 4.4,
    cuisine: "Snacks, Street Food",
    time: "15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    veg: true
  }
];

export const popularMeals = [
  { id: 101, name: "Paneer Butter Masala", price: 240, veg: true, restId: 1 },
  { id: 102, name: "Chicken Hyderabadi", price: 320, veg: false, restId: 3 },
  { id: 103, name: "Masala Dosa Set", price: 120, veg: true, restId: 2 },
  { id: 104, name: "Butter Naan (2pcs)", price: 80, veg: true, restId: 1 },
  { id: 105, name: "Veg Thali Deluxe", price: 280, veg: true, restId: 1 },
  { id: 106, name: "Egg Curry", price: 190, veg: false, restId: 4 },
  { id: 107, name: "Chole Bhature", price: 160, veg: true, restId: 4 },
  { id: 108, name: "Gulab Jamun", price: 90, veg: true, restId: 6 },
];