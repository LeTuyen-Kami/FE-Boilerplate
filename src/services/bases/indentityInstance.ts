import ky from "ky";
import { TIMEOUT, ENV } from "@/utils/constants";

export const identityInstance = ky.create({
  prefixUrl: ENV.VITE_APP_IDENTITY_SERVER,
  timeout: TIMEOUT,
});
