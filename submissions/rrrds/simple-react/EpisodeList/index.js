import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEpisodeAll } from "../api";
import "./episodesList.css";
import Paginator from "../Paginator";
import { EpisodeShort } from "../Episode";

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);

  useEffect(() => {
    fetchEpisodeAll(page).then(data => {
      setEpisodes(data.results);
      setPageTotal(data.info.pages);
    });
  }, [page]);

  return (
    <>
      <h2>Episodes</h2>
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
