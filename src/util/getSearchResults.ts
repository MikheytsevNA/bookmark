export async function getRawSearchResults(query: string) {
  const urlSearch = new URL("https://www.googleapis.com/books/v1/volumes");
  const params = urlSearch.searchParams;
  params.set("q", `${query}`);
  params.set("key", `${import.meta.env.VITE_GOOGLE_API_KEY}`);
  const response = await fetch(urlSearch);
  const data = await response.json();
  return data;
}

export async function getSearchResults(query: string, maxResults = "10") {
  const urlSearch = new URL("https://www.googleapis.com/books/v1/volumes");
  const params = urlSearch.searchParams;
  params.set("q", `${query}`);
  params.set("maxResults", `${maxResults}`);
  params.set("key", `${import.meta.env.VITE_GOOGLE_API_KEY}`);
  const response = await fetch(urlSearch);
  const data = await response.json();
  return data;
}

export function getSearchResultsString(query: string, maxResults = "10") {
  const urlSearch = new URL("https://www.googleapis.com/books/v1/volumes");
  const params = urlSearch.searchParams;
  params.set("q", `${query}`);
  params.set("maxResults", `${maxResults}`);
  params.set("key", `${import.meta.env.VITE_GOOGLE_API_KEY}`);
  return urlSearch.search;
}
