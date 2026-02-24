import { Button } from "../../../shared/atom/Button";
import { NutritionGrid } from "./NutritionGrid";
import { useFood } from "../hooks/useFood";

type Props = {
  onBack: () => void;
};

export function NutritionSection({ onBack }: Props) {
  const { data, loading, error } = useFood();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white px-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <Button variant="secondary" onClick={onBack}>
            Return to Home
          </Button>
        </div>

        {loading && (
          <p className="text-slate-300 text-center mb-4">
            Loading nutrition data...
          </p>
        )}

        {error && (
          <p className="text-red-400 text-center mb-4">Error: {error}</p>
        )}

        {!loading && data ? (
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Nutrition Information
            </h2>

            <h3 className="text-lg font-medium mb-2">{data.product_name}</h3>

            {data.brands && (
              <p className="text-slate-300 mb-4">Brands: {data.brands}</p>
            )}

            <NutritionGrid nutriments={data.nutriments} />
          </div>
        ) : (
          <p className="text-slate-300 text-center">No data available.</p>
        )}
      </div>
    </main>
  );
}
