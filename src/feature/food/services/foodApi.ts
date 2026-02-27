import axios from "axios";
import type { Product, WgerIngredient, WgerResponse } from "./food.type";

// wger Ingredient API — free, no API key, dedicated nutrition database
const BASE_URL =
  "https://wger.de/api/v2/ingredient/?format=json&language=2&page_size=12&ordering=name";

export const fetchFood = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<WgerResponse>(BASE_URL);

    // Edge case: API responded but with unexpected shape
    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error("Unexpected response structure from wger API");
    }

    const { results } = data;

    // Edge case: API returned an empty list
    if (results.length === 0) {
      return [];
    }

    // wger ingredients often have null energy or empty name (incomplete DB entries)
    // — filter those out so we never render a blank card
    return results
      .filter(
        (item): item is WgerIngredient & { name: string; energy: number } =>
          !!item.name && item.energy !== null
      )
      .map(({ name, energy, protein, carbohydrates, fat }) => ({
        product_name: name,
        nutriments: {
          "energy-kcal_100g": energy,
          proteins_100g: protein ? parseFloat(protein) : undefined,
          carbohydrates_100g: carbohydrates ? parseFloat(carbohydrates) : undefined,
          fat_100g: fat ? parseFloat(fat) : undefined,
        },
      }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      throw new Error(
        status
          ? `wger API request failed with status ${status}`
          : "Network error — unable to reach the wger API"
      );
    }
    // Re-throw non-axios errors (e.g. unexpected response structure above)
    throw error;
  }
};
