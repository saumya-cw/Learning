import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

type FavoritesStoreState = {
  favoriteProductIds: number[];
};

type FavoritesStoreActions = {
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
};

type FavoritesStore = FavoritesStoreState & FavoritesStoreActions;

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const storage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return noopStorage;
  }

  return window.localStorage;
});

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteProductIds: [],
      toggleFavorite: (productId) => {
        set((state) => {
          const isAlreadyFavorite =
            state.favoriteProductIds.includes(productId);

          if (isAlreadyFavorite) {
            return {
              favoriteProductIds: state.favoriteProductIds.filter(
                (id) => id !== productId,
              ),
            };
          }

          return {
            favoriteProductIds: [...state.favoriteProductIds, productId],
          };
        });
      },
      isFavorite: (productId) => get().favoriteProductIds.includes(productId),
      clearFavorites: () => set({ favoriteProductIds: [] }),
    }),
    {
      name: "nutrients-dashboard-favorites",
      storage,
    },
  ),
);
