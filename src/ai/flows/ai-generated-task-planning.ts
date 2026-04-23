'use server';
/**
 * @fileOverview A Genkit flow for generating detailed action plans based on incoming events.
 *
 * - generateTaskPlan - A function that handles the AI-driven task planning process.
 * - AIGeneratedTaskPlanningInput - The input type for the generateTaskPlan function.
 * - AIGeneratedTaskPlanningOutput - The return type for the generateTaskPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for the AI-generated task planning flow.
const AIGeneratedTaskPlanningInputSchema = z.object({
  eventType: z
    .string()
    .describe('The type of event (e.g., "email", "whatsapp", "file_drop").'),
  eventContent: z
    .string()
    .describe(
      'The full content of the event, including metadata or message body, that requires an action plan.'
    ),
});
export type AIGeneratedTaskPlanningInput = z.infer<typeof AIGeneratedTaskPlanningInputSchema>;

// Output schema for the AI-generated task planning flow.
const AIGeneratedTaskPlanningOutputSchema = z.object({
  planContent: z
    .string()
    .describe(
      'The detailed plan in Markdown format, outlining steps to address the event.'
    ),
});
export type AIGeneratedTaskPlanningOutput = z.infer<typeof AIGeneratedTaskPlanningOutputSchema>;

// Define the prompt for generating a task plan.
const generateTaskPlanPrompt = ai.definePrompt({
  name: 'generateTaskPlanPrompt',
  input: {
    schema: AIGeneratedTaskPlanningInputSchema.extend({
      currentTime: z.string().describe('The current UTC timestamp in ISO format.'),
    }),
  },
  output: { schema: AIGeneratedTaskPlanningOutputSchema },
  prompt: `You are an expert AI agent assistant tasked with creating detailed action plans based on incoming events.
Your goal is to analyze the provided event and generate a comprehensive plan in Markdown format for an Obsidian vault.
The plan should be structured as follows:

---
created: {{{currentTime}}}
status: pending
---

## Objective
[A concise objective for handling the event, e.g., "Generate and send invoice to Client A"]

## Steps
- [ ] [Step 1 description, e.g., "Identify client: Client A (client_a@email.com)"]
- [ ] [Step 2 description, e.g., "Calculate amount: \$1,500 (from /Accounting/Rates.md)"]
- [ ] [Step 3 description, e.g., "Generate invoice PDF"]
- [ ] [Step 4 description, e.g., "Send via email (REQUIRES APPROVAL)"]
- [ ] [Step 5 description, e.g., "Log transaction"]

## Context
[Briefly summarize the event and any key details you extracted from the event content that are relevant to the plan.]

Ensure that all steps are actionable, clear, and logically ordered. If a step requires human approval or an external action, clearly indicate it.

Event Type: {{{eventType}}}
Event Content:
{{{eventContent}}}`,
});

// Define the Genkit flow
const aiGeneratedTaskPlanningFlow = ai.defineFlow(
  {
    name: 'aiGeneratedTaskPlanningFlow',
    inputSchema: AIGeneratedTaskPlanningInputSchema,
    outputSchema: AIGeneratedTaskPlanningOutputSchema,
  },
  async (input) => {
    const currentTime = new Date().toISOString(); // Get current UTC time in ISO format
    const { output } = await generateTaskPlanPrompt({
      ...input,
      currentTime,
    });
    if (!output) {
      throw new Error('Failed to generate a task plan.');
    }
    return output;
  }
);

/**
 * Generates a detailed action plan in Markdown format based on an incoming event.
 * The plan is designed for an Obsidian vault, outlining steps required to address the event.
 *
 * @param input - The event details for which to generate a plan.
 * @returns The generated plan content in Markdown format.
 */
export async function generateTaskPlan(
  input: AIGeneratedTaskPlanningInput
): Promise<AIGeneratedTaskPlanningOutput> {
  return aiGeneratedTaskPlanningFlow(input);
}