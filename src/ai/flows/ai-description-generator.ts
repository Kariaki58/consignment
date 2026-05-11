'use server';
/**
 * @fileOverview An AI agent for generating engaging product descriptions based on provided characteristics.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product (e.g., Handbag, Watch, Jewelry).'),
  brand: z.string().describe('The brand of the product (e.g., Chanel, Rolex, Hermes).'),
  condition: z.string().describe('The condition of the product (e.g., new with tags, excellent, good).'),
  features: z.array(z.string()).describe('A list of key features or selling points of the product.'),
  material: z.string().optional().describe('The primary material of the product (e.g., leather, gold, silk).'),
  color: z.string().optional().describe('The main color of the product.'),
  dimensions: z.string().optional().describe('The dimensions of the product.'),
  additionalNotes: z.string().optional().describe('Any additional notes or unique aspects to highlight.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated engaging product description.'),
  keywords: z.array(z.string()).describe('A list of relevant keywords for SEO.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in luxury consignment items. Your task is to craft a professional, engaging, and enticing product description for a high-end item.

Focus on highlighting the luxury, quality, and unique selling points of the item. The tone should be sophisticated and persuasive, targeting discerning buyers.

Generate a compelling product description and a list of relevant SEO keywords based on the following characteristics:

Product Name: {{{productName}}}
Category: {{{category}}}
Brand: {{{brand}}}
Condition: {{{condition}}}

Key Features:
{{#each features}}
- {{{this}}}
{{/each}}

{{#if material}}Material: {{{material}}}{{/if}}
{{#if color}}Color: {{{color}}}{{/if}}
{{#if dimensions}}Dimensions: {{{dimensions}}}{{/if}}
{{#if additionalNotes}}Additional Notes: {{{additionalNotes}}}{{/if}}

Your output should be a JSON object with two fields: 'description' (string) for the full description, and 'keywords' (array of strings) for SEO purposes.

Description:
Keywords:
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
