"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Users, Globe, Recycle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="The Future of Luxury Consumption"
            subtitle="About Us"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/office/800/600" 
                alt="Our Office" 
                fill 
                className="object-cover"
                data-ai-hint="modern office"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Veridian Market was founded on the belief that luxury should be sustainable and accessible. We bridge the gap between discerning collectors and the global marketplace, ensuring that high-quality craftsmanship finds a second life.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In a world of fast fashion, we champion the "Buy Less, Buy Better" ethos. Every item on our platform is a testament to enduring style and professional authenticity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { icon: ShieldCheck, title: "Unrivaled Trust", desc: "Every item is physically inspected by our team of master authenticators." },
              { icon: Users, title: "Global Community", desc: "Connecting thousands of sellers with verified buyers across 6 continents." },
              { icon: Globe, title: "World-Class Logistics", desc: "Seamless shipping and handling, no matter where you or your items are." },
              { icon: Recycle, title: "Circular Economy", desc: "Reducing fashion waste by extending the lifecycle of premium products." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-foreground text-background p-12 md:p-20 rounded-[3rem] text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">Ready to join the market?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-7 rounded-xl">Start Consigning</Button>
                <Button size="lg" variant="outline" className="text-background border-background hover:bg-background hover:text-foreground px-12 py-7 rounded-xl">Browse Catalog</Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Button({ children, className, variant, size, ...props }: any) {
  const base = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:opacity-50";
  const variants: any = {
    default: "bg-primary text-white",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes: any = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  return <button className={`${base} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className}`} {...props}>{children}</button>;
}
