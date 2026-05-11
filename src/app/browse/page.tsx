"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { FEATURED_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Heart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Explore the Market"
            subtitle="Catalog"
            description="Find your next piece from our verified global collection of luxury goods."
          />

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by brand, category, or model..." 
                className="pl-12 h-14 bg-white border-border rounded-xl shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-xl flex gap-2 border-border shadow-sm">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={`rounded-full px-6 py-2 h-auto text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white border-border hover:bg-muted"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <Card className="overflow-hidden border-none shadow-none bg-transparent">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full bg-white/95 text-foreground hover:bg-white shadow-lg backdrop-blur-sm border-none font-bold">
                        Quick Preview
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{product.brand}</p>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20 bg-primary/5">
                        {product.condition}
                      </Badge>
                    </div>
                    <h3 className="font-headline font-bold text-lg mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-foreground">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-20 text-center">
            <Button variant="outline" className="px-12 py-7 rounded-xl text-lg hover:bg-white border-border shadow-sm">
              Load More Items
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
