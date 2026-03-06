import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchFood } from "./foodApi";

vi.mock("axios");

describe("fetchFood service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call axios.get once", async () => {
    (axios.get as any).mockResolvedValue({ data: { results: [] } });

    await fetchFood();

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should return transformed product data on success", async () => {
    const mockResults = [
      {
        id: 42,
        name: "Test Ingredient",
        energy: 200,
        protein: "10",
        carbohydrates: "20",
        fat: "5",
      },
    ];

    (axios.get as any).mockResolvedValue({ data: { results: mockResults } });

    const result = await fetchFood();

    expect(result).toEqual([
      {
        id: 42,
        product_name: "Test Ingredient",
        nutriments: {
          "energy-kcal_100g": 200,
          proteins_100g: 10,
          carbohydrates_100g: 20,
          fat_100g: 5,
        },
      },
    ]);
  });

  it("should return empty array when results empty", async () => {
    (axios.get as any).mockResolvedValue({ data: { results: [] } });

    const result = await fetchFood();

    expect(result).toEqual([]);
  });

  it("should throw error when axios fails", async () => {
    (axios.get as any).mockRejectedValue(new Error("Network error"));

    await expect(fetchFood()).rejects.toThrow("Network error");
  });
});
