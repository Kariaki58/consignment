"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export default function CreateShipmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    service_type: "Air Freight",
    estimated_delivery: "",
  });

  const generateTrackingNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'ST-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;
      
      // Handle Image Upload to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('shipments')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('shipments')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const trackingNumber = generateTrackingNumber();

      const { data, error } = await supabase
        .from('shipments')
        .insert([
          {
            tracking_number: trackingNumber,
            status: 'Pending',
            origin: formData.origin,
            destination: formData.destination,
            weight: formData.weight,
            service_type: formData.service_type,
            estimated_delivery: formData.estimated_delivery,
            image_url: imageUrl,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Add initial tracking update
      await supabase
        .from('tracking_updates')
        .insert([
          {
            shipment_id: data.id,
            status: 'Shipment Created',
            location: formData.origin,
            time: new Date().toISOString(),
            is_completed: true,
            icon: 'Package'
          }
        ]);

      toast({
        title: "Shipment Created",
        description: `Tracking number: ${trackingNumber}`,
      });

      router.push(`/dashboard/${data.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating shipment",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-headline font-bold">New Shipment</h1>
          <p className="text-muted-foreground">Enter consignment details to generate a tracking ID.</p>
        </div>
      </div>

      <Card className="border-border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Product Image (Optional)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="cursor-pointer file:text-primary file:bg-primary/10 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-1 hover:file:bg-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Origin Location</label>
                <Input
                  required
                  placeholder="e.g. New York, NY"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination Location</label>
                <Input
                  required
                  placeholder="e.g. London, UK"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight</label>
                <Input
                  required
                  placeholder="e.g. 50 kg"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <select 
                  className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.service_type}
                  onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                >
                  <option value="Air Freight">Air Freight</option>
                  <option value="Ocean Freight">Ocean Freight</option>
                  <option value="Road Transport">Road Transport</option>
                  <option value="Express Courier">Express Courier</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Estimated Delivery Date</label>
                <Input
                  type="date"
                  required
                  value={formData.estimated_delivery}
                  onChange={(e) => setFormData({...formData, estimated_delivery: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <Link href="/dashboard">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Generating..." : "Generate Tracking ID"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
