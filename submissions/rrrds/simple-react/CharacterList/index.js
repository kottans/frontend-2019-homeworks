import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./characterList.css";
import { useDebounce } from "../hooks";
import { fetchCharacterAll } from "../api";
import { CharacterShort } from "../Character";
import Paginator from "../Paginator";
import Filters from "./Filters";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [pageTotal, setPageTotal] = useState(1);

  const debounceName = useDebounce(name, 900);

  useEffect(() => {
    fetchCharacterAll(page, { name: debounceName, gender }).then(data => {
      setCharacters(data.results);
      setPageTotal(data.info.pages);
    });
  }, [page, gender, debounceName]);

  return (
    <>
      <h2>Characters</h2>

      <Filters setName={setName} setGender={setGender} />

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
