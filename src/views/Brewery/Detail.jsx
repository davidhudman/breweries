import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

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
      {/* render brewery details as bootstrap card */}
      {brewery && (
        <Card>
          <Card.Header>{brewery.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>
                <strong>Location:</strong> {brewery.city}, {brewery.state}
                <br />
                {brewery.country}
              </p>
              {brewery.website_url && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={brewery.website_url}>{brewery.website_url}</a>
                </p>
              )}
              <p>
                <strong>Phone:</strong> {brewery.phone}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      <Link to="/breweries">Back to Breweries</Link>
    </main>
  );
}
