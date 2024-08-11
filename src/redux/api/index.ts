import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/v1`,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("tokens")!);
    if (token) {
      headers.set("Authorization", `Bearer ${token.accessToken}`);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["auth"],
  endpoints: () => ({}),
});
