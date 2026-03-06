import axios from "axios";
import type { Product, WgerIngredient, WgerResponse } from "./food.type";

const BASE_URL =
  (import.meta.env.VITE_WGER_API_URL as string | undefined) ??
  "https://wger.de/api/v2/ingredient/";

export const fetchFood = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<WgerResponse>(BASE_URL, {
      params: {
        format: "json",
        language: 2,
        page_size: 12,
        ordering: "name",
      },
    });

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error("Unexpected response structure from wger API");
    }

    const { results } = data;

    if (results.length === 0) {
      return [];
    }

    const toFinite = (value: string | null) => {
      const num = value == null ? NaN : Number.parseFloat(value);
      return Number.isFinite(num) ? num : undefined;
    };

    return results
      .filter(
        (
          item,
        ): item is WgerIngredient & {
          id: number;
          name: string;
          energy: number;
        } => typeof item.id === "number" && !!item.name && item.energy !== null,
      )
      .map(({ id, name, energy, protein, carbohydrates, fat }) => ({
        id,
        product_name: name,

        nutriments: {
          "energy-kcal_100g": energy,
          proteins_100g: toFinite(protein),
          carbohydrates_100g: toFinite(carbohydrates),
          fat_100g: toFinite(fat),
        },
      }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      throw new Error(
        status
          ? `wger API request failed with status ${status}`
          : "Network error — unable to reach the wger API",
      );
    }

    throw error;
  }
};
