import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLocation, fetchCharacter } from "../api";
import { CharacterShort } from "../Character";

export function Location({ match }) {
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchLocation(match.params.id).then(data => setLocation(data));
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }

    const residentsId = location.residents.map(ep => ep.id);
    fetchCharacter(residentsId).then(data => {
      if (Array.isArray(data)) {
        setResidents(data);
      } else {
        setResidents([data]);
      }
    });
  }, [location]);

  return (
    location && (
      <div>
        <h2>Location</h2>
        <div>
          <h3>{location.name}</h3>

          <dl className="description">
            <dt>Dimension:</dt>
            <dd>{location.dimension}</dd>
            <dt>Type:</dt>
            <dd>{location.type}</dd>
          </dl>
        </div>

        <div>
          <h3>Residents</h3>
          <ul>
            {residents.map(char => {
              return (
                <li key={char.id}>
                  <Link to={`/character/${char.id}`}>
                    <CharacterShort charData={char} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
}

export function LocationShort({ locData }) {
  return locData.name;
}
