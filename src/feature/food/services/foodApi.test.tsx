import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchFood } from "./foodApi";

vi.mock("axios");

describe("fetchFood service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call axios.get once", async () => {
    (axios.get as any).mockResolvedValue({
      data: {
        status: 1,
        product: {},
      },
    });

    await fetchFood();

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should return transformed product data on success", async () => {
    const mockResponse = {
      data: {
        status: 1,
        product: {
          product_name: "Test Product",
          brands: "Test Brand",
          nutriments: { energy: 100 },
        },
      },
    };

    (axios.get as any).mockResolvedValue(mockResponse);

    const result = await fetchFood();

    expect(result).toEqual({
      product_name: "Test Product",
      brands: "Test Brand",
      nutriments: { energy: 100 },
    });
  });

  it("should return null when status is not 1", async () => {
    (axios.get as any).mockResolvedValue({
      data: {
        status: 0,
        product: null,
      },
    });

    const result = await fetchFood();

    expect(result).toBeNull();
  });

  it("should throw error when axios fails", async () => {
    (axios.get as any).mockRejectedValue(new Error("Network error"));

    await expect(fetchFood()).rejects.toThrow("Network error");
  });
});
