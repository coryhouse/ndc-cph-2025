import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "../utils/env";
import ky from "ky";
import { foodSchema } from "../types/foods.types";
import Menu from "../Menu";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: foods } = useSuspenseQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const json = await ky.get(env.apiUrl + "/foods").json();
      return foodSchema.array().parse(json);
    },
  });

  return <Menu foods={foods} />;
}
