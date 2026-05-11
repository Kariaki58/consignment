"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  PlusCircle,
  Menu,
  X,
  Globe2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-muted/30">Loading...</div>;
  }

  const NavLinks = () => (
    <>
      <Link href="/dashboard" onClick={() => setIsMobileOpen(false)}>
        <Button variant="ghost" className={`w-full justify-start gap-3 ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Button>
      </Link>
      <Link href="/dashboard/create" onClick={() => setIsMobileOpen(false)}>
        <Button variant="ghost" className={`w-full justify-start gap-3 ${pathname === '/dashboard/create' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
          <PlusCircle className="w-5 h-5" /> New Shipment
        </Button>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-primary" />
          <span className="font-headline font-bold text-lg text-foreground">SwiftTrack</span>
        </Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-foreground">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border flex-col p-6 transition-transform transform md:relative md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="hidden md:flex items-center gap-2 mb-12 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-primary-foreground font-headline font-bold">S</span>
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-foreground">SwiftTrack</span>
        </div>

        <nav className="flex-grow space-y-2 mt-8 md:mt-0">
          <NavLinks />
        </nav>

        <div className="pt-6 border-t border-border space-y-4">
          <div className="px-4 py-2 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
