import { FoodCard } from "./FoodCard";
import type { Food } from "./types/foods.types";

type FoodProps = {
  foods: Food[];
};
export default function Menu({ foods }: FoodProps) {
  return (
    <>
      <h1>Menu</h1>

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <FoodCard food={food} />
          </li>
        ))}
      </ul>
    </>
  );
}
