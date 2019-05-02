import React from "react";

function Filters({ setName, setGender }) {
  return (
    <div className="filters">
      <label>
        Name:
        <input
          type="text"
          onChange={ev => {
            setName(ev.target.value);
          }}
        />
      </label>

      <label>
        Gender:
        <select
          onChange={ev => {
            setGender(ev.target.value);
          }}
        >
          <option value="">All</option>
          <option value="unknown">Unknown</option>
          <option value="genderless">Genderless</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;
