import z from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.url(),
});

// Parse the environment variables at runtime and throw if they are invalid
const parsedEnv = envSchema.parse(import.meta.env);

export type Env = z.infer<typeof envSchema>;

// Public API for env variables
export const env = {
  /** REST API base URL */
  apiUrl: parsedEnv.VITE_API_URL,
};
