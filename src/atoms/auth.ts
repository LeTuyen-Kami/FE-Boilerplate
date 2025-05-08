import { atomWithStorage } from "jotai/utils";
import { jotaiStore } from "@/stores/jotaiStore";
export type AuthInfo = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
};

export const initialAuthInfo: AuthInfo = {
  accessToken: "",
  tokenType: "",
  refreshToken: "",
};

export const authAtom = atomWithStorage<AuthInfo>("auth", initialAuthInfo);
export const signInAction = (authInfo: AuthInfo) => {
  jotaiStore.set(authAtom, authInfo);
};

export const signOutAction = () => {
  jotaiStore.set(authAtom, initialAuthInfo);
};
