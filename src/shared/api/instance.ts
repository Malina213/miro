import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "../model/config";
import { ApiPaths } from "./schema";
import { store } from "../model/store/store";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);

export const publicClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const publicRqClient = createClient(publicClient);

fetchClient.use({
  async onRequest({ request }) {
    const state = store.getState();
    const token = state.session.token 
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  },
});
