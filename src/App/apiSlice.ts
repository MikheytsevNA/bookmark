// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit/react";
const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.googleapis.com/books" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getVolumes: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (query: string) => `/v1/volumes?${query}`,
      transformResponse: (response: { items: unknown }) => response.items,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetVolumesQuery } = apiSlice;
