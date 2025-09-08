import { Card } from "./components/Card";
import type { Food } from "./types/foods.types";

type FoodCardProps = {
  food: Food;
};

export function FoodCard({ food }: FoodCardProps) {
  return (
    <Card>
      <div className={`flex flex-col sm:flex-row gap-4`}>
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">{food.name}</h2>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {food.description}
          </p>

          <div className={`flex items-center justify-between`}>
            <p className={`font-bold "text-lg" : "text-xl text-green-600`}>
              ${food.price}
            </p>

            <div className="flex flex-wrap gap-1">
              {food.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center gap-1"
                  title={tag}
                >
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
          <img
            className="w-full h-32 sm:h-full object-cover rounded-lg shadow-sm"
            alt={food.name}
            src={`/images/${food.image}`}
          />
        </div>
      </div>
    </Card>
  );
}
