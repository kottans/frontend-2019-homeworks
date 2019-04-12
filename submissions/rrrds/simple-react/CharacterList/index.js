import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./characterList.css";
import { fetchCharacterAll } from "../api";
import { CharacterShort } from "../Character";
import Paginator from "../Paginator";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);

  useEffect(() => {
    fetchCharacterAll(page).then(data => {
      setCharacters(data.results);
      setPageTotal(data.info.pages);
    });
  }, [page]);

  return (
    <>
      <h2>Characters</h2>
      <ul className="character-list">
        {characters.map(char => {
          return (
            <li key={char.id} className="character-item">
              <Link to={`/character/${char.id}`}>
                <CharacterShort charData={char} />
              </Link>
            </li>
          );
        })}
      </ul>
      <Paginator
        current={page}
        pages={pageTotal}
        onPageChange={page => setPage(page)}
      />
    </>
  );
}

export default CharacterList;
