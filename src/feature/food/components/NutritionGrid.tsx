import type { Nutriments } from "../services/food.type";

type Props = {
  nutriments?: Nutriments;
};

export function NutritionGrid({ nutriments }: Props) {
  const fields = [
    { label: "Energy", key: "energy-kcal_100g", unit: "kcal" },
    { label: "Proteins", key: "proteins_100g", unit: "g" },
    { label: "Fat", key: "fat_100g", unit: "g" },
    { label: "Carbohydrates", key: "carbohydrates_100g", unit: "g" },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ label, key, unit }) => (
        <div key={label}>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="text-lg">
            {nutriments?.[key] ?? 0} {unit}
          </p>
        </div>
      ))}
    </div>
  );
}
