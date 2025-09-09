import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { NewFood } from "../types/foods.types";
import { env } from "../utils/env";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const newFood: NewFood = {
  name: "",
  price: 0,
  description: "",
  image: "",
  tags: [],
};

function Admin() {
  const [food, setFood] = useState(newFood);
  const { mutate: createFood, isPending } = useMutation({
    mutationFn: async (newFood: NewFood) => {
      return fetch(env.apiUrl + "/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newFood,
          // HACK: Hard coding since we don't have image upload or tags input yet
          image: "placeholder.png",
          tags: [],
        }),
      });
    },
    onSuccess: () => {
      // Redirect to home page via Tanstack Router
      navigate({ to: "/" });
    },
  });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFood((prev) => ({
      ...prev,
      [id]: id === "price" ? Number(value) : value,
    }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isPending) return; // Prevent multiple submissions
        createFood(food);
      }}
    >
      <h1 className="p-2">Add new Food</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          className="border border-gray-300"
          id="name"
          value={food.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          className="border border-gray-300"
          id="description"
          value={food.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          className="border border-gray-300"
          id="price"
          value={food.price}
          onChange={handleChange}
        />
      </div>
      <input
        aria-disabled={isPending}
        type="submit"
        value={isPending ? `Adding...` : `Add Food`}
        className="border border-gray-300 bg-fuchsia-400 p-3 disabled:opacity-50"
      />
    </form>
  );
}
