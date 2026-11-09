import ky from "ky";

import { env } from "./env";

export const api = ky.create({
  prefix: env.VITE_API_URL,
});
