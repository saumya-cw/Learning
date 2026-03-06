import { useState } from "react";
import { FoodHome } from "../components/FoodHome";
import { NutritionSection } from "../components/NutritionSection";

export function FoodLandingPage() {
  const [showNutrition, setShowNutrition] = useState(false);

  return (
    <>
      {!showNutrition ? (
        <FoodHome onStart={() => setShowNutrition(true)} />
      ) : (
        <NutritionSection onBack={() => setShowNutrition(false)} />
      )}
    </>
  );
}
