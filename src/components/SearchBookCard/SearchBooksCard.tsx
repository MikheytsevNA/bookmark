import { useState, useMemo } from "react";
import { BookData, rawBookData } from "../../entities/BookData";
import { getRawSearchResults } from "../../util/getSearchResults";
import { BookCard } from "../BookCard/BookCard";
import "./SearchBooksCard.css";

type SearchBookCardsProps = { searchQuery: string };

export function SearchBookCards({ searchQuery }: SearchBookCardsProps) {
  const [loading, setLoading] = useState(true);
  const [resultList, setResultList] = useState<BookData[]>([]);
  const query = searchQuery === "" ? "Dune" : searchQuery;
  useMemo(
    // мне нужно выполнить функцию getRawSearchResults один раз - можно использовать useEffect или useMemo, разницы нет(???)
    () =>
      getRawSearchResults(query).then((response) => {
        setResultList(() =>
          response.items.map((item: rawBookData) => new BookData(item)),
        );
        setLoading(() => false);
      }),
    [query],
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <ul className="book-cards">
      {resultList.map((item) => (
        <BookCard item={item} key={item.id}></BookCard>
      ))}
    </ul>
  );
}
