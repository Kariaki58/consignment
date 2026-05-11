"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, ChevronRight, Loader2, Sparkles, Upload, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateProductDescription, type GenerateProductDescriptionOutput } from "@/ai/flows/ai-description-generator";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ConsignPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    condition: "excellent",
    features: [] as string[],
    material: "",
    color: "",
    dimensions: "",
    additionalNotes: "",
  });
  const [aiResult, setAiResult] = useState<GenerateProductDescriptionOutput | null>(null);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleAiGenerate = async () => {
    if (!formData.productName || !formData.brand || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in Name, Brand, and Category for the AI to work effectively.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateProductDescription({
        ...formData,
        features: formData.features.length > 0 ? formData.features : ["Authentic", "Premium Quality"]
      });
      setAiResult(result);
      toast({
        title: "Description Generated",
        description: "AI has crafted a luxury description for your item.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const currentProgress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="text-sm font-bold text-primary flex items-center gap-1 mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl font-headline font-bold mb-4">Consign Your Item</h1>
            <p className="text-muted-foreground text-lg">Our expert team is ready to help you sell your luxury collection.</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-12 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline">Basic Information</CardTitle>
                    <CardDescription>Tell us about the piece you'd like to consign.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input 
                          id="productName" 
                          placeholder="e.g. Classic Flap Bag" 
                          value={formData.productName}
                          onChange={(e) => setFormData({...formData, productName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input 
                          id="brand" 
                          placeholder="e.g. Chanel" 
                          value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input 
                          id="category" 
                          placeholder="e.g. Handbags" 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <select 
                          id="condition"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          value={formData.condition}
                          onChange={(e) => setFormData({...formData, condition: e.target.value})}
                        >
                          <option value="new with tags">New with Tags</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl text-lg flex gap-2">
                    Next Step <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <Card className="border-border shadow-sm overflow-hidden">
                  <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center justify-between">
                    <div>
                      <h2 className="font-headline font-bold text-xl flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" /> AI Product Description
                      </h2>
                      <p className="text-sm text-muted-foreground">Let our luxury AI craft the perfect listing for you.</p>
                    </div>
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isGenerating}
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                      Generate
                    </Button>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material (Optional)</Label>
                      <Input 
                        id="material" 
                        placeholder="e.g. Lambskin" 
                        value={formData.material}
                        onChange={(e) => setFormData({...formData, material: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc">Generated Description</Label>
                      <Textarea 
                        id="desc" 
                        rows={6}
                        placeholder="Your AI generated description will appear here..."
                        value={aiResult?.description || ""}
                        readOnly={!aiResult}
                        className={aiResult ? "bg-background" : "bg-muted/30"}
                      />
                    </div>
                    {aiResult && (
                      <div className="space-y-2">
                        <Label>Recommended Keywords</Label>
                        <div className="flex flex-wrap gap-2">
                          {aiResult.keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="px-8 py-6 rounded-xl">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl text-lg flex gap-2">
                    Finalize Submission <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-headline font-bold mb-4">Application Submitted!</h2>
                <p className="text-muted-foreground text-xl mb-12 max-w-xl mx-auto">
                  Thank you for consigning with us. Our authentication experts will review your item within 24-48 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-primary px-12 py-7 rounded-xl">View Dashboard</Button>
                  </Link>
                  <Link href="/browse">
                    <Button size="lg" variant="outline" className="px-12 py-7 rounded-xl">Back to Market</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
