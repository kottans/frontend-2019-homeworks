import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEpisodeAll } from "../api";
import { useDebounce } from "../hooks";
import "./episodesList.css";
import Paginator from "../Paginator";
import { EpisodeShort } from "../Episode";
import Filters from "./Filters";

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [name, setName] = useState("");

  const debounceName = useDebounce(name, 900);

  useEffect(() => {
    fetchEpisodeAll(page, { name: debounceName }).then(data => {
      setEpisodes(data.results);
      setPageTotal(data.info.pages);
    });
  }, [page, debounceName]);

  return (
    <>
      <h2>Episodes</h2>

      <Filters setName={setName} />

      <ul className="episodes-list">
        {episodes.map(ep => {
          return (
            <li key={ep.id} className="episode-item">
              <Link to={`/episode/${ep.id}`}>
                <EpisodeShort epData={ep} />
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

export default EpisodeList;
