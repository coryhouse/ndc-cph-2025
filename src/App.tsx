import "./App.css";
import { foodSchema } from "./types/foods.types";
import { env } from "./utils/env";
import { useQuery } from "@tanstack/react-query";

function App() {
  const {
    isLoading,
    error,
    data: foods,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await fetch(env.apiUrl + "/foods");
      const json = await response.json();
      return foodSchema.array().parse(json);
    },
  });

  if (error) throw error;
  if (isLoading || !foods) return <div>Loading...</div>;

  return (
    <>
      <h1>Menu</h1>

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.name} - ${food.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
