import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
                <span className="text-primary-foreground font-headline font-bold">S</span>
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">SwiftTrack</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              SwiftTrack Logistics is your reliable partner for global freight, consignment tracking, and courier services. Fast, secure, and always on time.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/track" className="hover:text-primary transition-colors">Track Shipment</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Freight Services</Link></li>
              <li><Link href="/locations" className="hover:text-primary transition-colors">Global Locations</Link></li>
              <li><Link href="/business" className="hover:text-primary transition-colors">Business Accounts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/legal" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Join Our Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Get the latest logistics updates and tracking insights.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-background border-border text-foreground focus-visible:ring-primary rounded-xl"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SwiftTrack Logistics Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
