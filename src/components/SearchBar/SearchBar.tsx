import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../util/useDebounce";
import { QuickSearch } from "../QuickSearch/QuickSearch";
import "./SearchBar.css";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { getLoginStatus } from "../../util/getLoginstatus";
import PropTypes from "prop-types";

function SearchBar({ currentSearch }: { currentSearch: string }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(currentSearch);
  const debouncedSearch = useDebounce(search, 500);
  const [selectedOption, setSelectedOption] = useState<string>("10");
  const [quickSearchVisibility, setQuickSearchVisibility] = useState(false);

  return (
    <div
      className="d-flex justify-content-center align-items-center input-group mb-1 pb-2"
      id="search-container"
    >
      <div>
        <label className="mx-2">
          <input
            type="text"
            className="form-control"
            placeholder="Введите запрос"
            key={currentSearch}
            defaultValue={currentSearch}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onFocus={() => {
              setQuickSearchVisibility(true);
            }}
            onBlur={() => {
              setQuickSearchVisibility(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                RegistrationHandler.changeHistory(
                  getLoginStatus()!,
                  debouncedSearch,
                );
                navigate(`/search?q=${search}&maxResults=${selectedOption}`);
              }
            }}
          ></input>
        </label>
        {quickSearchVisibility && debouncedSearch !== "" ? (
          <QuickSearch debouncedSearch={debouncedSearch}></QuickSearch>
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
        onClick={() => {
          RegistrationHandler.changeHistory(getLoginStatus()!, debouncedSearch);
          navigate(`/search?q=${search}&maxResults=${selectedOption}`);
        }}
      >
        Поиск
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string,
};

export default SearchBar;
