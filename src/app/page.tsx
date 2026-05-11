"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp, ChevronRight, Search, Globe2, Plane, Truck, Ship, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const STATS = [
  { value: "15M+", label: "Parcels Delivered" },
  { value: "190+", label: "Countries Served" },
  { value: "24/7", label: "Customer Support" },
  { value: "99.9%", label: "On-Time Delivery" }
];

const SERVICES = [
  {
    id: 1,
    title: "Air Freight",
    description: "Fast and reliable air cargo services for your urgent consignments.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Ocean Freight",
    description: "Cost-effective ocean shipping solutions for large volume cargo.",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Road Transport",
    description: "Extensive network of ground transportation across the continent.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Express Courier",
    description: "Same-day and next-day delivery for small parcels and documents.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <Badge variant="secondary" className="px-4 py-1 text-sm font-medium border-primary/20 bg-primary/10 text-primary rounded-full flex items-center w-fit gap-2">
                    <Globe2 className="w-4 h-4" /> Global Logistics Partner
                  </Badge>
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-[1.1]">
                  Track Your <span className="text-primary">Consignment</span> in Real-Time.
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  SwiftTrack offers seamless, secure, and fast logistics solutions. Enter your tracking number below to get live updates on your shipment.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="relative max-w-lg mb-8">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Enter Tracking Number (e.g. ST123456789)" 
                    className="pl-12 pr-32 py-8 text-lg rounded-2xl shadow-lg border-2 border-primary/20 focus-visible:ring-primary"
                  />
                  <Link href="/track">
                    <Button className="absolute right-2 top-2 bottom-2 rounded-xl bg-primary hover:bg-primary/90 text-white px-6 font-bold text-lg transition-transform hover:scale-105">
                      Track
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="px-8 py-7 rounded-xl text-lg hover:bg-muted font-bold text-foreground">
                      Explore Services
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/consignment.jpg"
                  alt="Logistics Cargo"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glassmorphism p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary-foreground font-bold mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active Shipment
                      </p>
                      <h3 className="font-headline font-bold text-xl text-white">Cargo Ship ST-8802</h3>
                    </div>
                    <Button variant="secondary" className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-md">
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
        </section>

        {/* Stats Section */}
        <section className="bg-foreground py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center text-white">
                  <p className="text-4xl md:text-5xl font-headline font-bold mb-2 text-primary">{stat.value}</p>
                  <p className="text-white/70 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:row md:items-end justify-between mb-12 gap-6">
              <SectionHeader
                title="Comprehensive Logistics"
                subtitle="Our Services"
                description="We offer a wide array of freight and consignment services tailored to meet your supply chain demands."
                className="mb-0"
              />
              <Link href="/services">
                <Button variant="link" className="text-primary text-lg flex gap-2 p-0 h-auto font-bold">
                  View All Services <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -10 }}
                  className="group h-full"
                >
                  <Card className="overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 bg-card h-full flex flex-col rounded-3xl">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg">
                        <service.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="font-headline font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-grow">{service.description}</p>
                      <Button variant="ghost" className="mt-6 w-full justify-between p-0 hover:bg-transparent hover:text-primary group/btn">
                        Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Seamless Shipping Process"
              subtitle="How It Works"
              description="From booking to delivery, our process is designed for maximum efficiency and transparency."
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative mt-16">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-16 right-16 h-1 bg-muted rounded-full -z-10" />
              
              {[
                { step: "01", title: "Book Consignment", icon: Clock, desc: "Schedule your pickup online or drop off at our locations." },
                { step: "02", title: "Secure Transit", icon: ShieldCheck, desc: "Your cargo is handled with utmost care and security." },
                { step: "03", title: "Live Tracking", icon: Search, desc: "Monitor your shipment's progress in real-time." },
                { step: "04", title: "Safe Delivery", icon: CheckCircle2, desc: "On-time delivery to the final destination, guaranteed." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center text-primary mb-6 relative transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:scale-110">
                    <item.icon className="w-10 h-10" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background font-bold flex items-center justify-center text-sm shadow-md">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-primary">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent pointer-events-none hidden md:block" />
              
              <div className="relative z-10 p-12 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-6 leading-tight">
                    Ready to ship your next consignment?
                  </h2>
                  <p className="text-primary-foreground/90 text-lg mb-10 leading-relaxed max-w-md">
                    Get an instant quote and experience the reliability of SwiftTrack logistics today. We move your business forward.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-7 font-bold text-lg">
                      Get a Quote
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/30 text-foreground hover:bg-white/10 rounded-xl px-8 py-7 font-bold text-lg bg-background">
                      Contact Sales
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-end relative">
                    <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden border-8 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                      <Image 
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
                        alt="Logistics Operations"
                        fill
                        className="object-cover"
                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
