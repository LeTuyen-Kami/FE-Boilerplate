import { identityInstance } from "../bases/indentityInstance";

export const getAuthInfo = async () => {
  const response = await identityInstance.get("/auth/info");
  return response.json();
};

export const refreshToken = async () => {
  const response = await identityInstance.post<{
    accessToken: string;
    tokenType: string;
  }>("/auth/refresh");
  return response.json();
};

export const signIn = async (email: string, password: string) => {
  const response = await identityInstance.post("/auth/signin", {
    json: { email, password },
  });
  return response.json();
};

export const signUp = async (email: string, password: string) => {
  const response = await identityInstance.post("/auth/signup", {
    json: { email, password },
  });
  return response.json();
};
