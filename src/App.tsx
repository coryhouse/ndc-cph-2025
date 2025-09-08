import { useEffect, useState } from "react";
import "./App.css";
import type { Food } from "./types/foods.types";

function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetch(import.meta.env.VITE_API_URL + "/foods");
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await resp.json();
        setFoods(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) throw error;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Menu</h1>
      <button
        onClick={() => {
          throw new Error("Test error");
        }}
      >
        Throw Error
      </button>

      {/* <ul>
        {foods.map((food: any) => (
          <li key={food.id}>
            {food.name} - ${food.price}
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
