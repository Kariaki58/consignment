"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Search, Menu, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-headline font-bold">V</span>
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-foreground">
            Veridian<span className="text-primary">Market</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">Browse</Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Search className="w-5 h-5" />
          </Button>
          <Link href="/consign">
            <Button className="bg-primary hover:bg-primary/90 text-white flex gap-2">
              <PlusCircle className="w-4 h-4" />
              Consign Now
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-6 animate-in slide-in-from-top-4">
          <Link href="/browse" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Browse</Link>
          <Link href="/how-it-works" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
          <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>My Dashboard</Link>
          <Link href="/consign">
            <Button className="w-full bg-primary py-6" onClick={() => setIsMobileMenuOpen(false)}>
              Start Consigning
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
