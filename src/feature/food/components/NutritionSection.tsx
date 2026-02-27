import { Button } from "../../../shared/atom/Button";
import { NutritionGrid } from "./NutritionGrid";
import { useFood } from "../hooks/useFood";

type Props = {
  onBack: () => void;
};                   

export function NutritionSection({ onBack }: Props) {
  const { data, loading, error } = useFood();

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-900 via-slate-900 to-black text-white px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <Button variant="secondary" onClick={onBack}>
            Return to Home
          </Button>
        </div>

        {loading && (
          <p className="text-slate-300 text-center mb-4">
            Loading nutrition data...
          </p>
        )}

        {!loading && error && (
          <p className="text-red-400 text-center mb-4">Error: {error}</p>
        )}

        {!loading && !error && data.length === 0 && (
          <p className="text-slate-300 text-center">No products found.</p>
        )}

        {!loading && !error && data.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">
              Nutrition Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product, index) => (
                <div
                  key={`${product.product_name}-${index}`}
                  className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.01] transition-all"
                >
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400 line-clamp-2">
                    {product.product_name ?? "Unknown Product"}
                  </h3>

                  {product.nutriments ? (
                    <NutritionGrid nutriments={product.nutriments} />
                  ) : (
                    <p className="text-slate-500 text-sm">Nutritional data unavailable.</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
