import React from "react";

const UserCards = (item) => {
  return (
    <div key={item.id} className="col-md-3 col-sm-6 mb-3">
      <div className="card card__main">
        <img className="card-img-top" src={item.image} alt={item.name} />
        <div className="card-body">
          <h6>{item.name}</h6>
          <p className="list-group-item">{item.gender}</p>
          <p className="list-group-item">{item.species}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
