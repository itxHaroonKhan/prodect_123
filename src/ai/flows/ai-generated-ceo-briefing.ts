'use server';
/**
 * @fileOverview Generates a "Monday Morning CEO Briefing" by auditing weekly bank transactions and completed tasks,
 * summarizing revenue, identifying bottlenecks, and suggesting proactive actions based on business goals.
 *
 * - aiGeneratedCEOBriefing - A function that generates the CEO briefing.
 * - AIGeneratedCEOBriefingInput - The input type for the aiGeneratedCEOBriefing function.
 * - AIGeneratedCEOBriefingOutput - The return type for the aiGeneratedCEOBriefing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Raw input schema for the flow, containing all necessary data.
const AIGeneratedCEOBriefingInputSchema = z.object({
  businessGoalsMarkdown: z.string().describe("The full markdown content of Business_Goals.md, containing objectives and audit rules."),
  weeklyRevenue: z.number().describe("Total revenue for the current week."),
  monthlyTarget: z.number().describe("Overall monthly revenue target, typically extracted from Business_Goals.md."),
  monthlyCurrent: z.number().describe("Current month-to-date revenue against the monthly target."),
  completedTasks: z.array(z.object({
    task: z.string().describe("Name of the completed task."),
    expectedDays: z.number().describe("Expected duration for the task in days."),
    actualDays: z.number().describe("Actual duration taken for the task in days."),
  })).describe("List of tasks completed this week, including their expected and actual durations for bottleneck analysis."),
  bankTransactions: z.array(z.object({
    description: z.string().describe("Description of the bank transaction (e.g., 'Netflix Subscription', 'Client Payment X')."),
    amount: z.number().describe("Amount of the transaction. Positive for income, negative for expenses."),
    date: z.string().datetime().describe("Date of the transaction in ISO 8601 format."),
  })).describe("List of bank transactions for the audit period, used for identifying subscriptions and expenses."),
  periodStart: z.string().describe("Start date of the briefing period in YYYY-MM-DD format (e.g., '2025-12-30')."),
  periodEnd: z.string().describe("End date of the briefing period in YYYY-MM-DD format (e.g., '2026-01-05')."),
  currentTimestamp: z.string().datetime().describe("Current timestamp for briefing generation in ISO 8601 format (e.g., '2026-01-06T07:00:00Z')."),
});
export type AIGeneratedCEOBriefingInput = z.infer<typeof AIGeneratedCEOBriefingInputSchema>;

// Output schema for the flow and prompt.
const AIGeneratedCEOBriefingOutputSchema = z.object({
  briefingContent: z.string().describe("The full markdown content of the Monday Morning CEO Briefing, formatted according to the provided template."),
});
export type AIGeneratedCEOBriefingOutput = z.infer<typeof AIGeneratedCEOBriefingOutputSchema>;

// Define the prompt using Genkit's ai.definePrompt
const aiGeneratedCEOBriefingPrompt = ai.definePrompt({
  name: 'aiGeneratedCEOBriefingPrompt',
  input: { schema: AIGeneratedCEOBriefingInputSchema },
  output: { schema: AIGeneratedCEOBriefingOutputSchema },
  prompt: `You are an expert business analyst and assistant to a CEO. Your task is to generate a comprehensive "Monday Morning CEO Briefing" based on the provided data.

The briefing should summarize the past week's performance, identify bottlenecks, and offer proactive, actionable suggestions.
You MUST strictly adhere to the "CEO Briefing Template" structure below, filling in all sections by analyzing the provided 'Business Goals', 'Weekly Revenue', 'Monthly Target', 'Current MTD Revenue', 'Completed Tasks', and 'Bank Transactions'.

**Instructions for each section:**

1.  **Metadata**: Populate 'generated' with '{{{currentTimestamp}}}' and 'period' with '{{{periodStart}}} to {{{periodEnd}}}'.
2.  **Executive Summary**: Provide a brief, high-level summary of the week's performance, highlighting overall status (e.g., "Strong week with revenue ahead of target. One bottleneck identified." or "Challenging week with revenue below target and several project delays.").
3.  **Revenue**:
    *   State 'This Week' revenue using 'weeklyRevenue'.
    *   State 'MTD' revenue using 'monthlyCurrent' and show it as a percentage of 'monthlyTarget'.
    *   Determine the 'Trend' (e.g., "On track", "Ahead of target", "Below target") based on 'monthlyCurrent' relative to the proportional target for the current point in the month (e.g., if it's mid-month and 'monthlyCurrent' is > 50% of 'monthlyTarget', it's "On track" or "Ahead of target").
4.  **Completed Tasks**:
    *   Iterate through 'completedTasks'.
    *   If 'actualDays' is greater than 'expectedDays' for any task, identify it as a bottleneck.
    *   If there are any bottlenecks, present them in a table format as shown in the template. The table should include 'Task', 'Expected' (days), 'Actual' (days), and 'Delay' (calculated 'actualDays' - 'expectedDays').
    *   If no significant bottlenecks are identified, state "No significant bottlenecks identified this week."
5.  **Proactive Suggestions**:
    *   **Cost Optimization**:
        *   Carefully read the "Subscription Audit Rules" section within the provided 'Business_Goals.md' content.
        *   Analyze the 'bankTransactions' to identify recurring expenses that resemble subscriptions.
        *   Apply the audit rules (e.g., "No login in 30 days", "Cost increased > 20%", "Duplicate functionality") to these identified subscriptions.
        *   For each flagged subscription, generate a clear, actionable suggestion, formatted as shown in the template (e.g., "- **Notion**: No team activity in 45 days. Cost: \u002415/month.
  - [ACTION] Cancel subscription?").
    *   **Upcoming Deadlines**:
        *   Extract all upcoming project deadlines from the "Active Projects" section of the 'Business_Goals.md' content.
        *   List them clearly, indicating the project name and deadline date.
    *   Add any other relevant proactive suggestions derived from the data (e.g., based on revenue trends or recurring issues).

---
## CEO Briefing Template Example:

\`\`\`markdown
---
generated: 2026-01-06T07:00:00Z
period: 2025-12-30 to 2026-01-05
---

# Monday Morning CEO Briefing

## Executive Summary
Strong week with revenue ahead of target. One bottleneck identified.

## Revenue
- **This Week**: \u00242,450
- **MTD**: \u00244,500 (45% of \u002410,000 target)
- **Trend**: On track

## Completed Tasks
| Task | Expected | Actual | Delay |
|------|----------|--------|-------|
| Client B proposal | 2 days | 5 days | +3 days |

## Proactive Suggestions
### Cost Optimization
- **Notion**: No team activity in 45 days. Cost: \u002415/month.
  - [ACTION] Cancel subscription? Move to /Pending_Approval

### Upcoming Deadlines
- Project Alpha final delivery: Jan 15 (9 days)
- Quarterly tax prep: Jan 31 (25 days)

---
*Generated by AI Employee v0.1*
\`\`\`

---
## Provided Data for Analysis:

### Business Goals:
\`\`\`markdown
{{{businessGoalsMarkdown}}}
\`\`\`

### Weekly Revenue:
\u0024{{{weeklyRevenue}}}

### Monthly Target:
\u0024{{{monthlyTarget}}}

### Current MTD Revenue:
\u0024{{{monthlyCurrent}}}

### Completed Tasks:
\`\`\`json
{{{json completedTasks}}}
\`\`\`

### Bank Transactions:
\`\`\`json
{{{json bankTransactions}}}
\`\`\`
`,
});

// Define the Genkit flow
export async function aiGeneratedCEOBriefing(input: AIGeneratedCEOBriefingInput): Promise<AIGeneratedCEOBriefingOutput> {
  return aiGeneratedCEOBriefingFlow(input);
}

const aiGeneratedCEOBriefingFlow = ai.defineFlow(
  {
    name: 'aiGeneratedCEOBriefingFlow',
    inputSchema: AIGeneratedCEOBriefingInputSchema,
    outputSchema: AIGeneratedCEOBriefingOutputSchema,
  },
  async (input) => {
    const { output } = await aiGeneratedCEOBriefingPrompt(input);
    return output!;
  }
);
