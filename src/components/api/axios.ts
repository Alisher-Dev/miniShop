import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_API;
const telegramUrl = import.meta.env.VITE_BASE_TELEGRAM;

export async function api(
  url?: string,
  data?: any,
  method?: "GET" | "POST" | "DELETE",
  base_url?: "api" | "telegram"
) {
  return await axios({
    baseURL: base_url === "telegram" ? telegramUrl : baseUrl,
    method: method || "GET",
    url: url,
    data: data,
  });
}
