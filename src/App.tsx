import "./App.css";
import type { Food } from "./types/foods.types";
import { useFetch } from "./hooks/useFetch";
import { useDate } from "./hooks/useDate";

function App() {
  const {
    loading,
    error,
    data: foods,
  } = useFetch<Food[]>("http://localhost:3001/foods");

  const date = useDate();
  if (error) throw error;
  if (loading || !foods) return <div>Loading...</div>;

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
