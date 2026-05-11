"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlusCircle, Package, MapPin, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching shipments",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold mb-2">My Shipments</h1>
          <p className="text-muted-foreground">Manage and track your consignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={fetchShipments} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Link href="/dashboard/create">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <PlusCircle className="w-4 h-4" /> New Shipment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
              <h3 className="text-2xl font-bold">{shipments.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Recent Consignments</CardTitle>
          <CardDescription>A list of all your active and past shipments.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-muted-foreground">Loading shipments...</div>
          ) : shipments.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">No shipments found</h3>
              <p className="text-muted-foreground mb-6">You haven't created any consignments yet.</p>
              <Link href="/dashboard/create">
                <Button>Create Your First Shipment</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Est. Delivery</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium font-mono">{item.tracking_number}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            item.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                            item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-primary/10 text-primary'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3"/> {item.origin}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary"/> {item.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.service_type}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {item.estimated_delivery}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/track?id=${item.tracking_number}`} target="_blank">
                            <Button variant="ghost" size="icon" title="View Public Tracking">
                              <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/${item.id}`}>
                            <Button variant="outline" size="sm">Manage</Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
