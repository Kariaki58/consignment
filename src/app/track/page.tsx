"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Package, Truck, CheckCircle2, Clock, Calendar, Anchor, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const getIcon = (iconStr: string) => {
  switch (iconStr) {
    case 'Truck': return Truck;
    case 'MapPin': return MapPin;
    case 'Clock': return Clock;
    case 'CheckCircle2': return CheckCircle2;
    case 'Anchor': return Anchor;
    case 'Plane': return Plane;
    case 'Package': return Package;
    default: return Package;
  }
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || "";
  
  const [trackingId, setTrackingId] = useState(initialId);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingId.trim()) return;
    
    setIsSearching(true);
    setErrorMsg("");
    setResult(null);
    
    try {
      // Fetch shipment
      const { data: shipment, error: shipError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingId.trim())
        .single();

      if (shipError || !shipment) {
        throw new Error("Shipment not found. Please check your tracking number.");
      }

      // Fetch updates
      const { data: updates, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('time', { ascending: true });

      if (updatesError) throw updatesError;

      setResult({
        ...shipment,
        timeline: updates || []
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleTrack();
    }
  }, [initialId]);

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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-border shadow-xl rounded-3xl overflow-hidden">
            <div className="bg-primary/5 p-8 border-b border-border">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input 
                    type="text" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking Number (e.g. ST-88029145)" 
                    className="pl-11 pr-4 py-7 text-base md:text-lg rounded-2xl bg-background border-2 border-primary/20 focus-visible:ring-primary shadow-sm w-full"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSearching}
                  className="rounded-2xl bg-primary hover:bg-primary/90 text-white px-8 py-7 font-bold text-lg transition-transform active:scale-95 w-full sm:w-auto shrink-0"
                >
                  {isSearching ? <span className="animate-pulse">Locating...</span> : "Track"}
                </Button>
              </form>
            </div>
            </Card>
          </motion.div>

          {isSearching && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Connecting to satellite tracking...</p>
            </div>
          )}

          {errorMsg && !isSearching && (
            <div className="text-center py-10 bg-destructive/10 text-destructive rounded-xl font-medium">
              {errorMsg}
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
                  {result.image_url && (
                    <div className="mb-8 rounded-2xl overflow-hidden h-64 md:h-80 relative border border-border bg-muted/30">
                      {/* Using standard img for external Supabase URLs without next/image domains config */}
                      <img src={result.image_url} alt="Product" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                      <p className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-sm">Tracking Number</p>
                      <h2 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
                        {result.tracking_number}
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 py-1 px-3 text-sm">
                          {result.status}
                        </Badge>
                      </h2>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-sm">Estimated Delivery</p>
                      <p className="text-2xl font-bold text-primary flex items-center md:justify-end gap-2">
                        <Calendar className="w-6 h-6" /> {result.estimated_delivery}
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
                        <p className="font-bold">{result.weight} &bull; {result.service_type}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Section */}
              <h3 className="text-2xl font-bold font-headline mt-12 mb-8">Journey History</h3>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[31px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-border">
                {result.timeline.map((item: any, index: number) => {
                  const Icon = getIcon(item.icon);
                  const isCurrent = index === result.timeline.length - 1;
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6"
                    >
                      {/* Icon */}
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 
                        ${isCurrent 
                          ? 'bg-primary border-white text-white scale-110 shadow-primary/30 shadow-lg' 
                          : item.is_completed 
                            ? 'bg-primary/10 border-white text-primary' 
                            : 'bg-muted border-white text-muted-foreground'}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-6 rounded-2xl border border-border bg-card shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h4 className={`font-bold text-lg ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                            {item.status}
                          </h4>
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            {new Date(item.time).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {item.location}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
                {result.timeline.length === 0 && (
                  <p className="text-center text-muted-foreground bg-card py-6 rounded-2xl">No tracking updates available yet.</p>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading tracker...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
