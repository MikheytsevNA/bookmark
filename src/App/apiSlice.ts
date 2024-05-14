import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rawBookData } from "../entities/BookData";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.googleapis.com/books" }),
  endpoints: (builder) => ({
    getVolumes: builder.query({
      query: (query: string) => {
        return `/v1/volumes${query}`;
      },
      transformResponse: (response: { items: rawBookData[] }) => {
        try {
          return response.items.map((item) => {
            return {
              id: item.id,
              title: item.volumeInfo.title,
              description: item.volumeInfo.description,
              published: item.volumeInfo.publishedDate,
              author: item.volumeInfo.authors[0] ?? "",
              images: {
                small: item.volumeInfo.imageLinks.smallThumbnail,
                big: item.volumeInfo.imageLinks.thumbnail,
              },
            };
          });
        } catch {
          return null;
        }
      },
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetVolumesQuery } = apiSlice;
