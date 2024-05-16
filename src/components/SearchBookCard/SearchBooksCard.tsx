import { getSearchResultsString } from "../../util/getSearchResults";
import { BookCard } from "../BookCard/BookCard";
import "./SearchBooksCard.css";
import SearchBar from "../SearchBar/SearchBar";
import { useGetVolumesQuery } from "../../App/apiSlice";
import { checkIfFavorite } from "../../util/checkIfFavorite";

type SearchBookCardsProps = { searchQuery: string };

export function SearchBookCards({ searchQuery }: SearchBookCardsProps) {
  const { data, isFetching, isSuccess } = useGetVolumesQuery(
    getSearchResultsString(searchQuery, "10"),
  );

  let searchResults;
  if (isFetching) {
    searchResults = (
      <div className="quick-search border list-group p-1">Загружаем...</div>
    );
  } else if (isSuccess) {
    searchResults = (
      <>
        <SearchBar currentSearch="" />

        <ul className="book-cards">
          {!data ? (
            <div>Ничего не было найдено</div>
          ) : (
            data.map((item) => (
              <BookCard
                item={{
                  ...item,
                  isInFavorites: checkIfFavorite(item.id),
                }}
                key={item.id}
              ></BookCard>
            ))
          )}
        </ul>
      </>
    );
  }

  return <>{searchResults}</>;
}
