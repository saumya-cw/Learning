import { Button } from "../../../shared/atom/Button";
import { useFavoritesStore } from "../store/favoritesStore";

type Props = {
  productId: number;
};

export function FavoriteToggleButton({ productId }: Props) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteProductIds.includes(productId),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Button
      variant={isFavorite ? "secondary" : "primary"}
      onClick={() => toggleFavorite(productId)}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </Button>
  );
}
