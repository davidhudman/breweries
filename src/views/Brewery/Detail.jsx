import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  // search openbrewerydb.org for brewery with id
  // and set state as response
  const getBrewery = () => {
    if (brewery === null) {
      axios
        .get(`https://api.openbrewerydb.org/breweries/${id}`)
        .then((response) => {
          setBrewery(response.data);
        });
    }
  };

  getBrewery();

  return (
    <main>
      {brewery && (
        <>
          <h1>{brewery.name}</h1>
          <p>
            <strong>
              {brewery.city}, {brewery.state}
            </strong>
          </p>
          <p>
            <strong>{brewery.country}</strong>
          </p>
          <p>{brewery.phone}</p>
          <p>
            <a href={brewery.website_url}>Visit Website</a>
          </p>
        </>
      )}
      <Link to="/breweries">Back to Breweries</Link>
    </main>
  );
}
