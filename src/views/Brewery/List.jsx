import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function BreweryList() {
  const [breweries, setBreweries] = useState(null);

  const getBreweries = () => {
    if (breweries === null) {
      axios.get(`https://api.openbrewerydb.org/breweries`).then((response) => {
        // set state as first 10 breweries from response
        setBreweries(response.data.slice(0, 10));
      });
    }
  };

  // create search submit handler
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // get value of search input
    const search = document.getElementById("search-input").value;
    // if search is not empty
    if (search && search.length > 0) {
      // make a request to the API with the search term
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
        .then((response) => {
          // set state as first ten breweries from response
          setBreweries(response.data);
        });
    }
  };

  getBreweries();

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Find a brewery"
          id="search-input"
        />
        <button type="submit" onClick={(event) => handleSearchSubmit(event)}>
          Search
        </button>
        <button type="reset">Reset</button>
      </form>
      <ul>
        {breweries &&
          breweries.map((brewery) => {
            return (
              <li key={brewery.id}>
                <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link> -{" "}
                {brewery.city}, {brewery.state}
              </li>
            );
          })}
      </ul>
    </main>
  );
}
