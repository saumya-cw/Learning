import { useFood } from "../hooks/useFood";

export function NutritionPage() {
  const { data, loading, error } = useFood();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Product Nutrition Details</h1>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && !data && <p>No product found.</p>}

      {data && (
        <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full">

          <h2 className="text-xl font-semibold">{data.product_name}</h2>

          <p className="text-slate-400 mb-4">Brand: {data.brands}</p>

          <div className="space-y-2">
            <p>
              Calories: {data.nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal
            </p>
            <p>Protein: {data.nutriments?.proteins_100g ?? "N/A"} g</p>
            <p>Fat: {data.nutriments?.fat_100g ?? "N/A"} g</p>
          </div>
        </div>
      )}
    </div>
  );
}
