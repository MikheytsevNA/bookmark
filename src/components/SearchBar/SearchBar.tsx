import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../util/useDebounce";
import { getRawSearchResults } from "../../util/getSearchResults";
import { BookData, rawBookData } from "../../entities/BookData";
import { QuickBookCard } from "../BookCard/QuickBookCard";
import { useGetVolumesQuery } from "../../App/apiSlice";
import "./SearchBar.css";

export function SearchBar({ currentSearch }: { currentSearch: string }) {
  const navigate = useNavigate();
  const [resultList, setResultList] = useState<BookData[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedOption, setSelectedOption] = useState<string>("10");

  useEffect(() => {
    if (debouncedSearch !== "") {
      getRawSearchResults(debouncedSearch).then((response) => {
        console.dir(response);
        if (response.status) {
          setResultList(() =>
            response.items.map((item: rawBookData) => new BookData(item)),
          );
        }
      });
    }
  }, [debouncedSearch]);
  return (
    <div className="search-container d-flex justify-content-center align-items-center input-group">
      <div>
        <label className="mx-2">
          <input
            type="text"
            className="form-control"
            placeholder="Введите запрос"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            defaultValue={currentSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(
                  `/search?q=${debouncedSearch}&maxResults=${selectedOption}`,
                );
              }
            }}
          ></input>
        </label>
        {debouncedSearch !== "" ? (
          resultList.length > 0 ? (
            <ul className="quick-search list-group">
              {resultList.map((item) => (
                <QuickBookCard item={item} key={item.id}></QuickBookCard>
              ))}
            </ul>
          ) : (
            <div className="quick-search list-group">Nothing...</div>
          )
        ) : null}
      </div>
      <div id="quantity-select" className="mx-2">
        <select
          className="form-control"
          onChange={(event) => setSelectedOption(event.target.value)}
          defaultValue={selectedOption}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
      </div>
      <button
        className="btn btn-outline-secondary mx-2 rounded"
        onClick={() =>
          navigate(`/search?q=${debouncedSearch}&maxResults=${selectedOption}`)
        }
      >
        Поиск
      </button>
    </div>
  );
}
