import { getSearchResultsString } from "../../util/getSearchResults";
import { useGetVolumesQuery } from "../../App/apiSlice";
import { QuickBookCard } from "../BookCard/QuickBookCard";

export function QuickSearch({ debouncedSearch }: { debouncedSearch: string }) {
  const { data, isFetching, isSuccess } = useGetVolumesQuery(
    getSearchResultsString(debouncedSearch, "5"),
  );

  let quickSearchResults;
  if (isFetching) {
    quickSearchResults = (
      <div className="quick-search border list-group p-1">Загружаем...</div>
    );
  } else if (isSuccess) {
    quickSearchResults = (
      <ul className="quick-search border rounded list-group p-1">
        {!data ? (
          <div>Ничего не было найдено</div>
        ) : (
          data.map((item) => (
            <QuickBookCard
              item={{ ...item, isInFavorites: false }}
              key={item.id}
            ></QuickBookCard>
          ))
        )}
      </ul>
    );
  }

  return <>{quickSearchResults}</>;
}
