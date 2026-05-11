"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { FEATURED_PRODUCTS, STATS, TESTIMONIALS } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-luxury")?.imageUrl || "";

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
                  <Badge variant="secondary" className="px-4 py-1 text-sm font-medium border-primary/20 bg-primary/5 text-primary rounded-full">
                    The New Standard in Luxury Consignment
                  </Badge>
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-[1.1]">
                  Elevate Your <span className="text-primary italic">Collection</span>.
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Join Veridian Market to buy, sell, and consign premium luxury items with absolute trust and unmatched professionalism.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Link href="/consign">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-7 rounded-xl text-lg flex gap-2">
                      Start Consigning <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/browse">
                    <Button size="lg" variant="outline" className="px-8 py-7 rounded-xl text-lg hover:bg-muted">
                      Browse Gallery
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                        <Image src={`https://picsum.photos/seed/face${i}/100/100`} alt="User" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by <span className="font-bold text-foreground">12,000+</span> luxury collectors worldwide.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={heroImage}
                  alt="Luxury Showcase"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="luxury watch"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glassmorphism p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Live Auction</p>
                      <h3 className="font-headline font-bold text-xl">Vintage GMT Master II</h3>
                    </div>
                    <Button variant="secondary" className="rounded-full h-12 w-12 p-0">
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        </section>

        {/* Stats Section */}
        <section className="bg-primary py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center text-white">
                  <p className="text-4xl md:text-5xl font-headline font-bold mb-2">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:row md:items-end justify-between mb-12 gap-6">
              <SectionHeader
                title="Curated Selection"
                subtitle="Exclusive Drops"
                description="Discover our hand-picked selection of high-end items, authenticated by our expert team."
                className="mb-0"
              />
              <Link href="/browse">
                <Button variant="link" className="text-primary text-lg flex gap-2 p-0 h-auto font-bold">
                  View All Collections <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURED_PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-none shadow-none bg-transparent h-full">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-4 left-4 bg-primary text-white">New Arrival</Badge>
                      )}
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{product.brand}</p>
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
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/30 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Consign with Confidence"
              subtitle="The Veridian Way"
              description="A seamless, high-touch process designed to maximize your item's value."
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-border -z-10" />
              
              {[
                { step: "01", title: "Submit Item", icon: Zap, desc: "Quickly upload photos and details using our AI-assisted tool." },
                { step: "02", title: "Verify", icon: ShieldCheck, desc: "Our expert team meticulously authenticates every single piece." },
                { step: "03", title: "List & Market", icon: TrendingUp, desc: "Professional photography and targeted global marketing campaigns." },
                { step: "04", title: "Get Paid", icon: CheckCircle2, desc: "Receive your payment directly to your account upon successful sale." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary mb-6 relative border border-border group transition-colors hover:bg-primary hover:text-white">
                    <item.icon className="w-10 h-10" />
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-md">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link href="/consign">
                <Button size="lg" className="bg-primary text-white rounded-xl px-12 py-7">
                  Start Your First Consignment
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <SectionHeader
                  title="What our collectors say"
                  subtitle="Testimonials"
                  className="mb-8"
                />
                <div className="space-y-8">
                  {TESTIMONIALS.map((t, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="bg-white p-8 rounded-3xl border border-border shadow-sm flex gap-6"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden relative">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-lg italic text-foreground mb-4">"{t.content}"</p>
                        <h4 className="font-bold text-primary">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://picsum.photos/seed/about1/800/1000"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                  data-ai-hint="luxury interior"
                />
                <div className="absolute inset-0 bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
                  <div>
                    <h3 className="text-4xl font-headline font-bold mb-6">Our Mission</h3>
                    <p className="text-xl font-medium leading-relaxed">
                      "To democratize luxury by providing a secure, transparent, and professional marketplace for the circular economy."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section Preview */}
        <section className="py-24 bg-muted/30 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              title="Still have questions?"
              subtitle="Knowledge Base"
              description="Learn more about our authentication process, shipping, and commission rates."
              centered
            />
            <Link href="/faq">
              <Button variant="outline" className="rounded-xl px-12 py-7 text-lg hover:bg-background">
                Explore Full FAQ
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
