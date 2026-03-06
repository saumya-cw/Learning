import type { Product } from "../services/food.type";
import { NutritionGrid } from "./NutritionGrid";
import { FavoriteToggleButton } from "./FavoriteToggleButton";

type Props = {
  product: Product;
};

export function FoodCard({ product }: Props) {
  return (
    <article className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.01] transition-all">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-emerald-400 line-clamp-2">
          {product.product_name ?? "Unknown Product"}
        </h3>
        <FavoriteToggleButton productId={product.id} />
      </div>

      {product.nutriments ? (
        <NutritionGrid nutriments={product.nutriments} />
      ) : (
        <p className="text-slate-500 text-sm">Nutritional data unavailable.</p>
      )}
    </article>
  );
}
