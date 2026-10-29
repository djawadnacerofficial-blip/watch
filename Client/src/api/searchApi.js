import { API } from "./client";

export function searchApi(query) {
    return API(`/api/search?query=${encodeURIComponent(query)}`);
}