import { getSearchResultsString } from "../../util/getSearchResults";
import { BookCard } from "../BookCard/BookCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useGetVolumesQuery } from "../../App/apiSlice";

export function Search() {
  const [searchParams] = useSearchParams();
  const titleName = searchParams.get("q")!;
  const maxResults = searchParams.get("maxResults")!;
  const { data, isFetching, isSuccess } = useGetVolumesQuery(
    getSearchResultsString(titleName, maxResults),
  );

  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <SearchBar currentSearch={titleName} />

        <ul className="book-cards">
          {data.map((item) => (
            <BookCard
              item={{ ...item, isInFavorites: false }}
              key={item.id}
            ></BookCard>
          ))}
        </ul>
      </>
    );
  }

  return <>{content}</>;
}
