import { useState } from "react";
import { Button } from "../../../shared/atom/Button";
import { useFood } from "../hooks/useFood";

export function FoodLandingPage() {
  const { data, loading, error } = useFood();
  const [showNutrition, setShowNutrition] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white px-6">
      {!showNutrition ? (
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Food Nutrition Explorer</h1>
          <p className="text-lg text-slate-300 mb-10">
            Explore food nutrition using real product data.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowNutrition(true)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Check Product Nutrition"}
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="flex justify-center mb-6">
            <Button variant="secondary" onClick={() => setShowNutrition(false)}>
              Return to Home
            </Button>
          </div>

          {error && (
            <p className="text-red-400 text-center mb-4">Error: {error}</p>
          )}

          {data ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Nutrition Information
              </h2>
              <h3 className="text-lg font-medium mb-2">{data.product_name}</h3>
              {data.brands && (
                <p className="text-slate-300 mb-4">Brands: {data.brands}</p>
              )}
              {data.nutriments && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Energy",
                      value: data.nutriments["energy-kcal_100g"],
                      unit: "kcal",
                    },
                    {
                      label: "Proteins",
                      value: data.nutriments.proteins_100g,
                      unit: "g",
                    },
                    {
                      label: "Fat",
                      value: data.nutriments.fat_100g,
                      unit: "g",
                    },
                    {
                      label: "Carbohydrates",
                      value: data.nutriments.carbohydrates_100g,
                      unit: "g",
                    },
                  ].map(({ label, value, unit }) => (
                    <div key={label}>
                      <p className="text-sm text-slate-300">{label}</p>
                      <p className="text-lg">
                        {value || 0} {unit}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-300 text-center">No data available.</p>
          )}
        </div>
      )}
    </main>
  );
}
