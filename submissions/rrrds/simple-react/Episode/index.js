import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEpisode, fetchCharacter } from "../api";
import { CharacterShort } from "../Character";

export function Episode({ match }) {
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchEpisode(match.params.id).then(data => setEpisode(data));
  }, []);

  useEffect(() => {
    if (!episode) {
      return;
    }

    const charactersId = episode.characters.map(ep => ep.id);
    fetchCharacter(charactersId).then(data => {
      if (Array.isArray(data)) {
        setCharacters(data);
      } else {
        setCharacters([data]);
      }
    });
  }, [episode]);

  return (
    episode && (
      <>
        <h2>Episode</h2>
        <div>
          Name: {episode.name}
          Air Date: {episode.air_date}
        </div>
        <div className="characters">
          <h3>Characters</h3>
          <ul>
            {characters.map(char => {
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
      </>
    )
  );
}

export function EpisodeShort({ epData }) {
  return `${epData.episode} - ${epData.name}`;
}
