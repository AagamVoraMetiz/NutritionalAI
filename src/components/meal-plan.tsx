'use client';

import React, {useState, useEffect} from 'react';
import {generateMealPlan} from '@/ai/flows/generate-meal-plan';
import {UserProfile} from '@/services/bmr';
import {calculateBMR} from '@/services/bmr';
import {calculateCalorie} from '@/services/calorie';

interface MealPlanProps {
  userProfile: UserProfile;
}

export function MealPlan({userProfile}: MealPlanProps) {
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [calorieGoal, setCalorieGoal] = useState<number | null>(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      // Calculate BMR
      const bmrResult = await calculateBMR(userProfile);
      const bmrValue = bmrResult.bmr;

      // Estimate calorie needs (you might want to add a goal selection for the user)
      const calorieResult = await calculateCalorie({goal: 'maintain'});
      const calorieValue = calorieResult.calorie;
      setCalorieGoal(calorieValue);

      // Generate meal plan using Genkit
      const mealPlanResult = await generateMealPlan({
        calorieGoal: calorieValue,
        dietaryRestrictions: '',
        preferredFoods: '',
      });
      setMealPlan(mealPlanResult.mealPlan);
    };

    fetchMealPlan();
  }, [userProfile]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Your Meal Plan</h2>
      {calorieGoal && (
        <p className="mb-2">
          Based on your profile, your daily calorie goal is: {calorieGoal}
        </p>
      )}
      {mealPlan ? (
        <p className="whitespace-pre-line">{mealPlan}</p>
      ) : (
        <p>Generating meal plan...</p>
      )}
    </div>
  );
}

