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

  getBreweries();

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input type='text' name='search' placeholder='Find a brewery' />
        <button type='submit'>Search</button>
        <button type='reset'>Reset</button>
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
