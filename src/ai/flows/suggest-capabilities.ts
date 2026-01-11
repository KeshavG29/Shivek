// src/ai/flows/suggest-capabilities.ts
'use server';
/**
 * @fileOverview A flow that suggests relevant capabilities based on company information and taxonomy options.
 *
 * - suggestCapabilities - A function that suggests capabilities for a supplier profile.
 * - SuggestCapabilitiesInput - The input type for the suggestCapabilities function.
 * - SuggestCapabilitiesOutput - The return type for the suggestCapabilities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCapabilitiesInputSchema = z.object({
  companyInfo: z.string().describe('Information about the supplier company, including its history, mission, and values.'),
  taxonomyOptions: z.array(z.string()).describe('Selected taxonomy options representing the supplier company.'),
});
export type SuggestCapabilitiesInput = z.infer<typeof SuggestCapabilitiesInputSchema>;

const SuggestCapabilitiesOutputSchema = z.object({
  suggestedCapabilities: z.array(z.string()).describe('A list of suggested capabilities based on the company information and taxonomy options.'),
});
export type SuggestCapabilitiesOutput = z.infer<typeof SuggestCapabilitiesOutputSchema>;

export async function suggestCapabilities(input: SuggestCapabilitiesInput): Promise<SuggestCapabilitiesOutput> {
  return suggestCapabilitiesFlow(input);
}

const suggestCapabilitiesPrompt = ai.definePrompt({
  name: 'suggestCapabilitiesPrompt',
  input: {schema: SuggestCapabilitiesInputSchema},
  output: {schema: SuggestCapabilitiesOutputSchema},
  prompt: `You are an AI assistant helping suppliers create their profiles by suggesting relevant capabilities based on their company information and selected taxonomy options.

  Company Information: {{{companyInfo}}}
  Taxonomy Options: {{#each taxonomyOptions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Based on the above information, suggest a list of capabilities that the supplier can add to their profile.
  The output MUST be an array of strings, where each string is a suggested capability.
  Make sure the suggestions are relevant and specific to the company's profile and the selected taxonomy.
  Limit the suggestions to a maximum of 10 capabilities.
  `, 
});

const suggestCapabilitiesFlow = ai.defineFlow(
  {
    name: 'suggestCapabilitiesFlow',
    inputSchema: SuggestCapabilitiesInputSchema,
    outputSchema: SuggestCapabilitiesOutputSchema,
  },
  async input => {
    const {output} = await suggestCapabilitiesPrompt(input);
    return output!;
  }
);
