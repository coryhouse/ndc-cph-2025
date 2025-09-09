import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { NewFood } from "../types/foods.types";
import { env } from "../utils/env";
import { useMutation } from "@tanstack/react-query";
import Input from "../shared/Input";
import type { FormStatus } from "../types/form.types";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

type Errors = {
  name?: string;
  price?: string;
  description?: string;
};

const newFood: NewFood = {
  name: "",
  price: 0,
  description: "",
  image: "",
  tags: [],
};

function Admin() {
  const [food, setFood] = useState(newFood);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
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

  function validate(food: NewFood) {
    const errors: Errors = {};
    if (food.name.length === 0) {
      errors.name = "Name is required";
    }
    if (food.price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (food.description.length === 0) {
      errors.description = "Description is required";
    }
    return errors;
  }

  const errors = validate(food);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isPending) return; // Prevent multiple submissions
        if (Object.keys(errors).length > 0) {
          setFormStatus("submitted-with-errors");
          return; // Don't submit if there are validation errors
        }
        createFood(food);
      }}
    >
      <h1 className="p-2">Add new Food</h1>
      <Input
        label="Name"
        id="name"
        value={food.name}
        onChange={handleChange}
        error={errors.name}
        formStatus={formStatus}
      />

      <Input
        id="price"
        label="Price"
        value={food.price}
        onChange={handleChange}
        error={errors.price}
        formStatus={formStatus}
      />

      <Input
        id="description"
        label="Description"
        value={food.description}
        onChange={handleChange}
        error={errors.description}
        formStatus={formStatus}
      />

      <input
        aria-disabled={isPending}
        type="submit"
        value={isPending ? `Adding...` : `Add Food`}
        className="border border-gray-300 bg-fuchsia-400 p-3 disabled:opacity-50"
      />
    </form>
  );
}
