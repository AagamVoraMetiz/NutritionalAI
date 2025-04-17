/**
 * Represents the user's physical attributes.
 */
export interface UserProfile {
  /**
   * The user's age in years.
   */
  age: number;
  /**
   * The user's gender (Male or Female).
   */
  gender: string;
  /**
   * The user's height in centimeters.
   */
  height: number;
  /**
   * The user's weight in kilograms.
   */
  weight: number;
}

/**
 * Represents the Basal Metabolic Rate (BMR).
 */
export interface BMR {
  /**
   * The user's BMR value
   */
  bmr: number;
}

/**
 * Asynchronously retrieves BMR information for a given user profile.
 *
 * @param userProfile The profile for which to retrieve BMR data.
 * @returns A promise that resolves to a BMR object.
 */
export async function calculateBMR(userProfile: UserProfile): Promise<BMR> {
  // TODO: Implement this by calling an API.
  // For now, return a fixed value.
  return {
    bmr: 1500, // Replace with actual BMR calculation later
  };
}

