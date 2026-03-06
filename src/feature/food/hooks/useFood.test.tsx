import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFood } from "./useFood";
import * as foodApi from "../services/foodApi";

vi.mock("../services/foodApi");

describe("useFood hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have loading true initially and empty data", () => {
    const { result } = renderHook(() => useFood());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("should set data on successful fetch", async () => {
    const mockProducts = [
      {
        id: 1,
        product_name: "Test Product",
        nutriments: { "energy-kcal_100g": 100 },
      },
    ];

    vi.mocked(foodApi.fetchFood).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useFood());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it("should set error when fetch fails", async () => {
    vi.mocked(foodApi.fetchFood).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useFood());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("API Error");
    expect(result.current.data).toEqual([]);
  });
});
