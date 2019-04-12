import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./character.css";
import { fetchCharacter, fetchEpisode } from "../api";
import { EpisodeShort } from "../Episode";

export function Character({ match }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchCharacter(match.params.id).then(data => {
      setCharacter(data);
    });
  }, []);

  useEffect(() => {
    if (!character) {
      return;
    }

    const episodesId = character.episode.map(ep => ep.id);
    fetchEpisode(episodesId).then(data => {
      if (Array.isArray(data)) {
        setEpisodes(data);
      } else {
        setEpisodes([data]);
      }
    });
  }, [character]);

  return (
    character && (
      <>
        <h2>Character info</h2>
        <div className="char-info">
          <div className="avatar">
            <img src={character.image} alt={character.name} />
          </div>
          <div className="main-info">
            <h3>{character.name}</h3>
            <dl className="description">
              <dt>Status:</dt>
              <dd>{character.status}</dd>
              <dt>Species:</dt>
              <dd>{character.species}</dd>
              <dt>Gender:</dt>
              <dd>{character.gender}</dd>
              <dt>Origin:</dt>
              <dd>
                {character.origin.id ? (
                  <Link to={`/location/${character.origin.id}`}>
                    {character.origin.name}
                  </Link>
                ) : (
                  character.origin.name
                )}
              </dd>
            </dl>
          </div>
        </div>
        <div className="episodes">
          <h3>Episodes</h3>
          <ul>
            {episodes.map(ep => {
              return (
                <li key={ep.id}>
                  <Link to={`/episode/${ep.id}`}>
                    <EpisodeShort epData={ep} />
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

export function CharacterShort({ charData }) {
  return (
    <div className="char-info char-info--short">
      <img
        src={charData.image}
        alt={charData.name}
        className="char-info__avatar"
      />
      <span>{charData.name}</span>
    </div>
  );
}
