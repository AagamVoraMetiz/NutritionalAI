'use client';

import {useState} from 'react';
import {UserProfileForm} from '@/components/user-profile-form';
import {MealPlan} from '@/components/meal-plan';
import {UserProfile} from '@/services/bmr';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NutriPlan</h1>
      <UserProfileForm onProfileSubmit={setUserProfile} />
      {userProfile && <MealPlan userProfile={userProfile} />}
    </div>
  );
}

