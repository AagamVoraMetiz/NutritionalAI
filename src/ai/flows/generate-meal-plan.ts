'use server';
/**
 * @fileOverview Generates a sample daily meal plan based on user caloric needs and preferences.
 *
 * - generateMealPlan - A function that handles the meal plan generation process.
 * - GenerateMealPlanInput - The input type for the generateMealPlan function.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateMealPlanInputSchema = z.object({
  calorieGoal: z.number().describe('The daily calorie goal for the meal plan.'),
  dietaryRestrictions: z.string().optional().describe('Any dietary restrictions (e.g., vegetarian, gluten-free).'),
  preferredFoods: z.string().optional().describe('Foods the user prefers to include in the meal plan.'),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const GenerateMealPlanOutputSchema = z.object({
  mealPlan: z.string().describe('A sample daily meal plan.'),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;

export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  return generateMealPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {
    schema: z.object({
      calorieGoal: z.number().describe('The daily calorie goal for the meal plan.'),
      dietaryRestrictions: z.string().optional().describe('Any dietary restrictions (e.g., vegetarian, gluten-free).'),
      preferredFoods: z.string().optional().describe('Foods the user prefers to include in the meal plan.'),
    }),
  },
  output: {
    schema: z.object({
      mealPlan: z.string().describe('A sample daily meal plan.'),
    }),
  },
  prompt: `You are a nutrition expert. Generate a sample daily meal plan based on the user\'s caloric needs and preferences.

Calorie Goal: {{{calorieGoal}}}
Dietary Restrictions: {{{dietaryRestrictions}}}
Preferred Foods: {{{preferredFoods}}}

Meal Plan:`,
});

const generateMealPlanFlow = ai.defineFlow<
  typeof GenerateMealPlanInputSchema,
  typeof GenerateMealPlanOutputSchema
>({
  name: 'generateMealPlanFlow',
  inputSchema: GenerateMealPlanInputSchema,
  outputSchema: GenerateMealPlanOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
