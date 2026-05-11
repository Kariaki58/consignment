import { PlaceHolderImages } from "./placeholder-images";

export const CATEGORIES = [
  "All",
  "Handbags",
  "Watches",
  "Jewelry",
  "Clothing",
  "Shoes",
  "Accessories"
];

export const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Classic Leather Satchel",
    brand: "Heritage Craft",
    price: 850,
    originalPrice: 1200,
    category: "Handbags",
    condition: "Excellent",
    image: PlaceHolderImages.find(img => img.id === "product-bag")?.imageUrl || "",
    isNew: true
  },
  {
    id: "2",
    name: "Precision Chronograph",
    brand: "Vertex Time",
    price: 3200,
    originalPrice: 4500,
    category: "Watches",
    condition: "Like New",
    image: PlaceHolderImages.find(img => img.id === "product-watch")?.imageUrl || "",
    isNew: false
  },
  {
    id: "3",
    name: "Velvet Night Pumps",
    brand: "Lumiere",
    price: 450,
    originalPrice: 750,
    category: "Shoes",
    condition: "Good",
    image: PlaceHolderImages.find(img => img.id === "product-shoes")?.imageUrl || "",
    isNew: false
  },
  {
    id: "4",
    name: "Shearling Aviator Jacket",
    brand: "Alpine Edge",
    price: 1100,
    originalPrice: 1800,
    category: "Clothing",
    condition: "Excellent",
    image: PlaceHolderImages.find(img => img.id === "product-jacket")?.imageUrl || "",
    isNew: true
  }
];

export const STATS = [
  { label: "Items Authenticated", value: "50K+" },
  { label: "Active Sellers", value: "12K+" },
  { label: "Consignor Payouts", value: "$4.2M" },
  { label: "Trust Score", value: "4.9/5" }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Collector",
    content: "Veridian Market has completely changed how I manage my luxury collection. Their authentication process is top-notch.",
    avatar: PlaceHolderImages.find(img => img.id === "user-avatar-1")?.imageUrl || ""
  },
  {
    name: "Michael Chen",
    role: "Fashion Enthusiast",
    content: "The easiest consignment experience I've ever had. From submission to payout, everything was seamless and professional.",
    avatar: PlaceHolderImages.find(img => img.id === "user-avatar-2")?.imageUrl || ""
  }
];

export const DASHBOARD_STATS = [
  { title: "Total Earnings", value: "$12,450.00", change: "+12%", color: "text-primary" },
  { title: "Active Listings", value: "14", change: "+2", color: "text-foreground" },
  { title: "Items Sold", value: "45", change: "+5", color: "text-accent" },
  { title: "Verification Status", value: "98%", change: "High", color: "text-blue-600" }
];
