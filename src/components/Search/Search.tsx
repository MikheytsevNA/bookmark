import { useState, useEffect } from "react";
import { BookData, rawBookData } from "../../entities/BookData";
import {
  getSearchResults,
  getSearchResultsString,
} from "../../util/getSearchResults";
import { BookCard } from "../BookCard/BookCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useGetVolumesQuery } from "../../App/apiSlice";

export function Search() {
  const [loading, setLoading] = useState(true);
  const [resultList, setResultList] = useState<BookData[]>([]);

  const [searchParams] = useSearchParams();
  const titleName = searchParams.get("q")!;
  const maxResults = searchParams.get("maxResults")!;
  const {
    data: post,
    isFetching,
    isSuccess,
  } = useGetVolumesQuery(getSearchResultsString(titleName, "5"));
  useEffect(() => {
    getSearchResults(titleName, maxResults).then((response) => {
      setResultList(() =>
        response.items.map((item: rawBookData) => new BookData(item)),
      );
      setLoading(() => false);
    });
  }, [titleName, maxResults]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <SearchBar currentSearch={titleName} />

      <ul className="book-cards">
        {resultList.map((item) => (
          <BookCard item={item} key={item.id}></BookCard>
        ))}
      </ul>
    </>
  );
}
