import { useEffect, useState } from "react";
import { fetchFood } from "../services/foodApi";
import type { Product } from "../services/food.type";

export const useFood = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFood = async () => {
      try {
        const result = await fetchFood();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch food data",
        );
      } finally {
        setLoading(false);
      }
    };

    getFood();
  }, []);

  return { data, loading, error };
};
