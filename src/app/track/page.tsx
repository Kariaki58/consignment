"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Package, Truck, CheckCircle2, Clock, Calendar, Anchor, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for a tracking result
const mockTrackingData = {
  trackingNumber: "ST-88029145",
  status: "In Transit",
  estimatedDelivery: "May 15, 2026",
  origin: "Shanghai, China",
  destination: "Los Angeles, USA",
  weight: "450 kg",
  serviceType: "Ocean Freight",
  timeline: [
    {
      id: 1,
      status: "Shipment Created",
      location: "Shanghai Port, China",
      date: "May 10, 2026",
      time: "08:45 AM",
      completed: true,
      icon: Package
    },
    {
      id: 2,
      status: "Origin Facility Departure",
      location: "Shanghai Port, China",
      date: "May 10, 2026",
      time: "06:30 PM",
      completed: true,
      icon: Truck
    },
    {
      id: 3,
      status: "In Transit (Ocean)",
      location: "Pacific Ocean",
      date: "May 11, 2026",
      time: "Current",
      completed: true,
      current: true,
      icon: Anchor
    },
    {
      id: 4,
      status: "Customs Clearance",
      location: "Port of Los Angeles, USA",
      date: "Pending",
      time: "",
      completed: false,
      icon: Clock
    },
    {
      id: 5,
      status: "Delivered",
      location: "Los Angeles Distribution Center",
      date: "Pending",
      time: "",
      completed: false,
      icon: CheckCircle2
    }
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<typeof mockTrackingData | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResult(mockTrackingData);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="px-4 py-1 mb-6 text-sm bg-primary/10 text-primary border-primary/20">
              Real-Time Tracking
            </Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Track Your Consignment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your tracking or reference number below to get the latest updates on your shipment's journey.
            </p>
          </motion.div>

          <motion.Card 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-border shadow-xl rounded-3xl overflow-hidden mb-12"
          >
            <div className="bg-primary/5 p-8 border-b border-border">
              <form onSubmit={handleTrack} className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <Input 
                  type="text" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Tracking Number (e.g. ST-88029145)" 
                  className="pl-12 pr-32 py-8 text-lg rounded-2xl bg-background border-2 border-primary/20 focus-visible:ring-primary shadow-sm"
                />
                <Button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-2 bottom-2 rounded-xl bg-primary hover:bg-primary/90 text-white px-8 font-bold text-lg transition-transform active:scale-95"
                >
                  {isSearching ? <span className="animate-pulse">Locating...</span> : "Track"}
                </Button>
              </form>
            </div>
          </motion.Card>

          {isSearching && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Connecting to satellite tracking...</p>
            </div>
          )}

          {result && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Status Header Card */}
              <Card className="rounded-3xl border-border shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                      <p className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-sm">Tracking Number</p>
                      <h2 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
                        {result.trackingNumber}
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 py-1 px-3 text-sm">
                          {result.status}
                        </Badge>
                      </h2>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-sm">Estimated Delivery</p>
                      <p className="text-2xl font-bold text-primary flex items-center md:justify-end gap-2">
                        <Calendar className="w-6 h-6" /> {result.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/30 p-6 rounded-2xl border border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Origin</p>
                        <p className="font-bold">{result.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Destination</p>
                        <p className="font-bold">{result.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Details</p>
                        <p className="font-bold">{result.weight} &bull; {result.serviceType}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Section */}
              <h3 className="text-2xl font-bold font-headline mt-12 mb-8">Journey History</h3>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[31px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-border">
                {result.timeline.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6"
                  >
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 
                      ${item.current 
                        ? 'bg-primary border-white text-white scale-110 shadow-primary/30 shadow-lg' 
                        : item.completed 
                          ? 'bg-primary/10 border-white text-primary' 
                          : 'bg-muted border-white text-muted-foreground'}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-6 rounded-2xl border border-border bg-card shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className={`font-bold text-lg ${item.current ? 'text-primary' : 'text-foreground'}`}>
                          {item.status}
                        </h4>
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          {item.date} <span className="hidden md:inline">&bull;</span> {item.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
