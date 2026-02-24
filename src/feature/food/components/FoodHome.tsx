import { Button } from "../../../shared/atom/Button";

type Props = {
  onStart: () => void;
};

export function FoodHome({ onStart }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Food Nutrition Explorer</h1>
        <p className="text-lg text-slate-300 mb-10">
          Explore food nutrition using real product data.
        </p>
        <Button variant="primary" onClick={onStart}>
          Check Product Nutrition
        </Button>
      </div>
    </main>
  );
}
