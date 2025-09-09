import ky from "ky";
import Menu from "./Menu";
import { foodSchema } from "./types/foods.types";
import { env } from "./utils/env";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function App() {
  // TODO: Extract to custom hook / QueryOptions
  const { data: foods } = useSuspenseQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const json = await ky.get(env.apiUrl + "/foods").json();
      return foodSchema.array().parse(json);
    },
  });

  return <Menu foods={foods} />;
}
