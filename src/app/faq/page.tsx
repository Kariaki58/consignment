"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does the authentication process work?",
      a: "Our authentication process involves a multi-step physical inspection by experts with decades of experience in luxury goods. We examine materials, stitching, hardware, date codes, and more. For certain high-value items, we also use third-party digital verification technology."
    },
    {
      q: "What are your consignment commission rates?",
      a: "Our commission rates are tiered based on the final sale price of your item. Typically, sellers earn between 60% and 85% of the final sale price. The higher the item's value, the higher your payout percentage."
    },
    {
      q: "How long does it take for my item to sell?",
      a: "Most items listed on Veridian Market sell within 14-21 days. High-demand items from brands like Rolex or Hermès often sell within 48 hours. Factors such as season, price, and condition also affect sale time."
    },
    {
      q: "Can I cancel my consignment listing?",
      a: "Yes, you can request to cancel your listing at any time before an item is sold. However, if the item has already been shipped to our facility, return shipping costs will be the responsibility of the consignor."
    },
    {
      q: "When and how do I get paid?",
      a: "Payouts are initiated 7 days after the item has been delivered to the buyer and confirmed as accepted. You can choose to receive payment via direct bank transfer, PayPal, or store credit with a 5% bonus."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Support Center"
            description="Find quick answers to common questions about buying, selling, and authentication."
            centered
          />

          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border py-4 last:border-0">
                  <AccordionTrigger className="text-left font-headline font-bold text-lg hover:no-underline hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-20 text-center p-12 bg-primary/5 rounded-3xl border border-primary/10">
            <h3 className="font-headline font-bold text-2xl mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-8">Our support team is available 24/7 to help you with your collection.</p>
            <button className="bg-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
