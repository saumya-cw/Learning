import { beforeEach, describe, expect, it } from "vitest";
import { useFavoritesStore } from "./favoritesStore";

describe("useFavoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteProductIds: [] });
  });

  it("adds a product to favorites on first toggle", () => {
    useFavoritesStore.getState().toggleFavorite(1001);

    expect(useFavoritesStore.getState().favoriteProductIds).toEqual([1001]);
    expect(useFavoritesStore.getState().isFavorite(1001)).toBe(true);
  });

  it("removes a product from favorites on second toggle", () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(1002);
    toggleFavorite(1002);

    expect(useFavoritesStore.getState().favoriteProductIds).toEqual([]);
    expect(useFavoritesStore.getState().isFavorite(1002)).toBe(false);
  });

  it("clears all favorites", () => {
    const { toggleFavorite, clearFavorites } = useFavoritesStore.getState();

    toggleFavorite(1);
    toggleFavorite(2);
    clearFavorites();

    expect(useFavoritesStore.getState().favoriteProductIds).toEqual([]);
  });
});
