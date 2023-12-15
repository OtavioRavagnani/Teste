import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

import { signOut } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // qualquer erro 401 (nao autorizado) devemos deslogar o usuario
        if (typeof window !== undefined) {
          // Chamar a funçao para deslogar o usuario
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      } else if (error.response.status === 400) {
        if (error.response.data) {
          if ((error.response.data as any).error) {
            toast.error((error.response.data as any).error);
            return api;
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
