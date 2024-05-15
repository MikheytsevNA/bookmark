import { getSearchResultsString } from "../../util/getSearchResults";
import { BookCard } from "../BookCard/BookCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useGetVolumesQuery } from "../../App/apiSlice";
import { getLoginStatus } from "../../util/getLoginstatus";
import { RegistrationHandler } from "../../entities/RegistrationManage";

function checkIfFavorite(id: string) {
  const registrationObj = RegistrationHandler.getRegisteredUsers();
  if (!registrationObj) {
    return false;
  }
  const isInFavorites = registrationObj
    .find(
      (user: { favorites: string[]; email: string }) =>
        user.email === getLoginStatus(),
    )!
    .favorites.includes(id);
  return isInFavorites;
}

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

  return <>{content}</>;
}
