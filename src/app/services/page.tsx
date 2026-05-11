"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, Truck, Ship, Zap, Warehouse, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

const DETAILED_SERVICES = [
  {
    id: "air-freight",
    title: "Air Freight",
    description: "When time is of the essence, our air freight services deliver. We offer expedited shipping globally, ensuring your cargo reaches its destination safely and on schedule.",
    features: ["Next-flight-out service", "Consolidation options", "Charter services", "Door-to-door delivery"],
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ocean-freight",
    title: "Ocean Freight",
    description: "Cost-effective solutions for large volumes. Our ocean freight network covers major ports worldwide, providing reliable FCL and LCL shipping options.",
    features: ["Full Container Load (FCL)", "Less than Container Load (LCL)", "Breakbulk cargo", "Port-to-port and Door-to-door"],
    icon: Ship,
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "road-transport",
    title: "Road Transport",
    description: "An extensive ground network ensures seamless domestic and cross-border deliveries. From standard trailers to specialized transport, we have you covered.",
    features: ["Full Truckload (FTL)", "Less than Truckload (LTL)", "Temperature-controlled", "Oversized cargo handling"],
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "express-courier",
    title: "Express Courier",
    description: "Swift, secure delivery for documents and small parcels. Ideal for urgent B2B and B2C shipments requiring real-time tracking and signature upon delivery.",
    features: ["Same-day delivery", "Next-day delivery", "Secure document handling", "Real-time tracking updates"],
    icon: Zap,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "warehousing",
    title: "Warehousing & Storage",
    description: "State-of-the-art storage facilities equipped with advanced inventory management systems. We provide secure short-term and long-term warehousing solutions.",
    features: ["Inventory management", "Order fulfillment (Pick & Pack)", "Cross-docking", "Climate-controlled facilities"],
    icon: Warehouse,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "customs",
    title: "Customs Clearance",
    description: "Navigate complex international trade regulations with ease. Our expert brokers ensure smooth and compliant clearance for all your cross-border shipments.",
    features: ["Import/Export documentation", "Tariff classification", "Duty & tax calculation", "Regulatory compliance consulting"],
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6 bg-muted/30">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-tight">
                Our <span className="text-primary">Services</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Comprehensive end-to-end logistics solutions tailored to meet the dynamic demands of global supply chains. We deliver reliability, speed, and security.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </section>

        {/* Detailed Services Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto space-y-24">
            {DETAILED_SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={service.id} className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Floating Icon Badge */}
                      <div className={`absolute top-6 ${isEven ? 'right-6' : 'left-6'} w-16 h-16 bg-background/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-primary z-10`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">{service.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                          <span className="text-foreground font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="rounded-xl px-6 py-6 font-semibold group hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Request a Quote 
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Network / CTA */}
        <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Empowering Your Supply Chain Globally</h2>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Partner with SwiftTrack to unlock efficient, scalable, and secure logistics networks that bridge markets across the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/track">
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 rounded-xl px-8 py-7 font-bold text-lg w-full sm:w-auto">
                  Track Shipment
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 rounded-xl px-8 py-7 font-bold text-lg w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
