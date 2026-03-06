## What does this PR do?
Implements favorites state management for food products using Zustand to ensure consistent UI behavior across product listing and favorites view.

- Adds Zustand-based `useFavoritesStore` with persisted `favoriteProductIds`.
- Adds a favorite toggle action on each product card using the shared composable `Button` component.
- Adds an All Products / Favorites toggle in the nutrition section.
- Introduces a Favorites-only view that renders only bookmarked products.
- Extracts reusable, composable UI pieces:
  - `FoodCard` for product rendering
  - `FavoriteToggleButton` for favorite/unfavorite action
- Refactors `NutritionSection` to reuse `FoodCard` and reduce duplicated rendering logic.
- Adds test-safe and SSR-safe persistence fallback storage in the Zustand store.
- Adds store tests for add/remove/clear favorites behavior.
- Improves existing hook tests by replacing unsafe `any` mocks with typed `vi.mocked(...)`.

## Manual Testing Steps
1. Start the app and navigate to the nutrition section.
2. Verify products are visible under **All Products**.
3. Click **Favorite** on a product card.
4. Verify the button state changes to **Unfavorite**.
5. Switch to **Favorites** view.
6. Verify the previously favorited product is visible.
7. Click **Unfavorite** on that product from Favorites view.
8. Verify it is removed from Favorites view.
9. Favorite multiple products from All Products.
10. Refresh the page.
11. Verify favorites persist after reload.
12. Toggle between **All Products** and **Favorites** repeatedly.
13. Verify state remains consistent and UI updates correctly.

## Pull Request Standards Checklist
- [x] This branch carries a single responsibility (favorites feature implementation).
- [x] Conventional commit messages and descriptive branch naming have been followed.

## Definition of Done
- [x] The implementation has been validated across multiple scenarios and behaves as expected.
- [x] Linting and formatting are enabled, and all highlighted issues in modified files are resolved.
- [x] All non-descriptive comments and dead code have been removed from modified files.
- [x] The branch has been rebased with the target base branch, and all commits in this PR belong to this implementation.

## Testing
- [x] Manual testing has been performed locally to validate all changes.
- [x] Automated tests for this implementation have been added/updated and executed locally.
