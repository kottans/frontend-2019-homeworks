import React from "react";
import "./paginator.css";

function Paginator({ current, pages, onPageChange }) {
  const handleClick = ev => {
    ev.preventDefault();

    if (ev.target.nodeName === "BUTTON") {
      onPageChange(ev.target.dataset.page);
    }
  };

  return (
    pages > 1 && (
      <div className="paginator">
        <ul onClick={handleClick} className="paginator-list">
          {[...Array(pages)].map((val, idx) => {
            const pageNumber = idx + 1;
            return (
              <li key={idx} className="paginator-item">
                <button
                  className="page-button"
                  data-page={pageNumber}
                  disabled={parseInt(current) === pageNumber}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}

export default Paginator;
