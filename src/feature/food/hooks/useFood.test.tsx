import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFood } from "./useFood";
import * as foodApi from "../services/foodApi";

vi.mock("../services/foodApi");

describe("useFood hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have loading true initially", () => {
    const { result } = renderHook(() => useFood());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should set data on successful fetch", async () => {
    const mockProduct = {
      product_name: "Test Product",
      brands: "Test Brand",
      nutriments: { energy: 100 },
    };

    (foodApi.fetchFood as any).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useFood());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockProduct);
    expect(result.current.error).toBe(null);
  });

  it("should set error when fetch fails", async () => {
    (foodApi.fetchFood as any).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useFood());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch food data");
    expect(result.current.data).toBe(null);
  });
});
