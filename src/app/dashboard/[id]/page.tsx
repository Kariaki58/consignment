"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Truck, CheckCircle2, Clock, Package } from "lucide-react";
import Link from "next/link";

export default function ManageShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const shipmentId = resolvedParams.id;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [shipment, setShipment] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  
  // New update form
  const [newUpdate, setNewUpdate] = useState({
    status: "",
    location: "",
    icon: "Truck",
    is_completed: true
  });
  const [addingUpdate, setAddingUpdate] = useState(false);

  const fetchDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: shipData, error: shipError } = await supabase
        .from('shipments')
        .select('*')
        .eq('id', shipmentId)
        .single();

      if (shipError) throw shipError;
      setShipment(shipData);

      const { data: updatesData, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipmentId)
        .order('time', { ascending: true });

      if (updatesError) throw updatesError;
      setUpdates(updatesData || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching details",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [shipmentId]);

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUpdate(true);
    try {
      const { error } = await supabase
        .from('tracking_updates')
        .insert([
          {
            shipment_id: shipmentId,
            status: newUpdate.status,
            location: newUpdate.location,
            time: new Date().toISOString(),
            is_completed: newUpdate.is_completed,
            icon: newUpdate.icon
          }
        ]);

      if (error) throw error;
      
      // If marked as Delivered, update main shipment status
      if (newUpdate.status.toLowerCase() === "delivered") {
        await supabase
          .from('shipments')
          .update({ status: 'Delivered' })
          .eq('id', shipmentId);
      } else if (shipment.status === 'Pending') {
         await supabase
          .from('shipments')
          .update({ status: 'In Transit' })
          .eq('id', shipmentId);
      }

      toast({ title: "Update added successfully" });
      setNewUpdate({ status: "", location: "", icon: "Truck", is_completed: true });
      fetchDetails();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding update",
        description: error.message,
      });
    } finally {
      setAddingUpdate(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!shipment) return <div className="p-10">Shipment not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-headline font-bold">Manage Shipment</h1>
          <p className="text-muted-foreground font-mono">{shipment.tracking_number}</p>
        </div>
      </div>

      {shipment.image_url && (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative border border-border bg-muted/30 mb-8">
          <img src={shipment.image_url} alt="Product" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Update Form */}
        <Card className="border-border shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Add Tracking Update</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUpdate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Title</label>
                <Input
                  required
                  placeholder="e.g. Arrived at Sort Facility"
                  value={newUpdate.status}
                  onChange={(e) => setNewUpdate({...newUpdate, status: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Location</label>
                <Input
                  required
                  placeholder="e.g. Frankfurt, Germany"
                  value={newUpdate.location}
                  onChange={(e) => setNewUpdate({...newUpdate, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon Type</label>
                <select 
                  className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newUpdate.icon}
                  onChange={(e) => setNewUpdate({...newUpdate, icon: e.target.value})}
                >
                  <option value="Truck">Truck (Transit)</option>
                  <option value="MapPin">MapPin (Location Check)</option>
                  <option value="Clock">Clock (Pending/Customs)</option>
                  <option value="CheckCircle2">Checkmark (Delivered)</option>
                  <option value="Package">Package (Processing)</option>
                </select>
              </div>
              <Button type="submit" disabled={addingUpdate} className="w-full">
                {addingUpdate ? "Saving..." : "Add Update"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Timeline Preview */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Current Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-5 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
              {updates.map((update, idx) => (
                <div key={update.id} className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background border-primary text-primary shrink-0 z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-sm">{update.status}</h4>
                    <p className="text-xs text-muted-foreground">{update.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(update.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {updates.length === 0 && (
                <p className="text-muted-foreground text-sm ml-10">No updates yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
