import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string(),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string().default("7d"),
  CORS_ORIGIN: z.string(),
});
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.log("Env variables do not satisfy the schema");
    process.exit(1);
}
export const env = Object.freeze(parsed.data);