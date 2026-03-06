import { useMemo, useState } from "react";
import { Button } from "../../../shared/atom/Button";
import { useFood } from "../hooks/useFood";
import { useFavoritesStore } from "../store/favoritesStore";
import { FoodCard } from "./FoodCard";

type Props = {
  onBack: () => void;
};

export function NutritionSection({ onBack }: Props) {
  const { data, loading, error } = useFood();
  const [activeView, setActiveView] = useState<"all" | "favorites">("all");
  const favoriteProductIds = useFavoritesStore(
    (state) => state.favoriteProductIds,
  );

  const favoriteProducts = useMemo(
    () => data.filter((product) => favoriteProductIds.includes(product.id)),
    [data, favoriteProductIds],
  );

  const productsToRender = activeView === "favorites" ? favoriteProducts : data;
  const emptyMessage =
    activeView === "favorites"
      ? "No favorite products yet."
      : "No products found.";

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-900 via-slate-900 to-black text-white px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" onClick={onBack}>
            Return to Home
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant={activeView === "all" ? "primary" : "secondary"}
              onClick={() => setActiveView("all")}
            >
              All Products
            </Button>
            <Button
              variant={activeView === "favorites" ? "primary" : "secondary"}
              onClick={() => setActiveView("favorites")}
            >
              Favorites
            </Button>
          </div>
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
              {activeView === "favorites"
                ? "Favorite Products"
                : "Nutrition Information"}
            </h2>

            {productsToRender.length === 0 ? (
              <p className="text-slate-300 text-center">{emptyMessage}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToRender.map((product) => (
                  <FoodCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
