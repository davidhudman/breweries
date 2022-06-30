import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

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
      <br />

      <h2>Search Results:</h2>
      <>
        {breweries &&
          breweries.map((brewery) => {
            // return each brewery as a boostrap card
            return (
              <div key={brewery.id}>
                <Card style={{ width: "50rem" }}>
                  <Container>
                    <Row>
                      <Col>
                        <Link to={`/breweries/${brewery.id}`}>
                          <strong>{brewery.name}</strong>
                        </Link>
                      </Col>
                      <Col>
                        <p>
                          <strong>
                            {brewery.city}, {brewery.state}
                          </strong>
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </div>
            );
          })}
      </>
    </main>
  );
}
