"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Settings, 
  LogOut, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  MoreVertical,
  Search,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { DASHBOARD_STATS } from "@/lib/mock-data";
import Link from "next/link";

const chartData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

const listings = [
  { id: "L001", name: "Rolex Submariner", price: "$12,400", status: "Active", views: 1240, date: "Oct 12, 2023" },
  { id: "L002", name: "Chanel Quilted Bag", price: "$4,200", status: "Sold", views: 890, date: "Sep 24, 2023" },
  { id: "L003", name: "Gucci Belt", price: "$450", status: "In Verification", views: 45, date: "Oct 15, 2023" },
  { id: "L004", name: "Hermès Scarf", price: "$850", status: "Active", views: 320, date: "Oct 02, 2023" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-border flex-col p-6">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-headline font-bold">V</span>
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-foreground">Veridian</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/5 text-primary hover:bg-primary/10">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <Package className="w-5 h-5" /> My Listings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <DollarSign className="w-5 h-5" /> Payouts
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" /> Notifications
          </Button>
        </nav>

        <div className="pt-6 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <Settings className="w-5 h-5" /> Settings
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/5">
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-border h-20 px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-10 bg-[#F8FAFB] border-none shadow-none focus-visible:ring-1" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/consign">
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <PlusCircle className="w-4 h-4" /> New Listing
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </header>

        <div className="p-10">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-3xl font-headline font-bold mb-2">Welcome back, James</h1>
            <p className="text-muted-foreground">Here's what's happening with your items today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {DASHBOARD_STATS.map((stat, idx) => (
              <Card key={idx} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-end justify-between">
                    <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Earnings Overview</CardTitle>
                <CardDescription>Estimated payouts over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#24754E" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#24754E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#24754E" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Quick Stats</CardTitle>
                <CardDescription>Monthly performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listing Quality Score</p>
                    <p className="text-xl font-bold">9.4/10</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Time to Sale</p>
                    <p className="text-xl font-bold">14 Days</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="font-bold mb-4">Verification Center</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Item Authentic:</span>
                      <span className="text-primary font-bold">Verified</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-primary w-full h-full rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listings Table */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Recent Listings</CardTitle>
                <CardDescription>Manage and monitor your active consignment items.</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            item.status === 'Sold' ? 'bg-green-100 text-green-700' : 
                            item.status === 'In Verification' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
