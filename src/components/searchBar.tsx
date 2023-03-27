import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // do something with the search query
  };

  return (
    <div className="d-flex justify-content-center m-2">
      <form onSubmit={handleSubmit} className="d-flex w-25">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="form-control me-2 bg-dark border-primary text-white"
          placeholder="Search"
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
