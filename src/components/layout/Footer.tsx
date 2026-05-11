import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-headline font-bold">V</span>
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">Veridian Market</span>
            </Link>
            <p className="text-muted-foreground/80 mb-6 text-sm leading-relaxed">
              Veridian Market is the world's most trusted destination for buying and selling high-end luxury items. We guarantee authenticity in every transaction.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-muted-foreground/80">
              <li><Link href="/browse" className="hover:text-primary transition-colors">Browse Items</Link></li>
              <li><Link href="/consign" className="hover:text-primary transition-colors">Sell an Item</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="/authentication" className="hover:text-primary transition-colors">Verification Process</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground/80">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/legal" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Join Our Newsletter</h4>
            <p className="text-sm text-muted-foreground/80 mb-4">Get early access to exclusive luxury drops and consignment tips.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-background/5 border-muted-foreground/20 text-background placeholder:text-muted-foreground/50 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/10 pt-8 flex flex-col md:row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Veridian Market Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Cookie Policy</Link>
            <Link href="#" className="hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
