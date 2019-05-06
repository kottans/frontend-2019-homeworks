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
    </div>
  );
}

export default Filters;
