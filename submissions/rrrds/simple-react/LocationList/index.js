import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLocationAll } from "../api";
import { useDebounce } from "../hooks";
import "./locations.css";
import { LocationShort } from "../Location";
import Paginator from "../Paginator";
import Filters from "./Filters";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [name, setName] = useState("");

  const debounceName = useDebounce(name, 900);

  useEffect(() => {
    fetchLocationAll(page, { name: debounceName }).then(data => {
      setLocations(data.results);
      setPageTotal(data.pages);
    });
  }, [page, debounceName]);

  return (
    <>
      <h2>Locations</h2>

      <Filters setName={setName} />

      <ul className="locations-list">
        {locations.map(loc => {
          return (
            <li key={loc.id} className="location-item">
              <Link to={`/location/${loc.id}`}>
                <LocationShort locData={loc} />
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

export default LocationList;
