import React from "react";

const filterOptions = {
  species: ["all", "human", "alien", "humanoid", "mytholog", "animal", "robot"],
  gender: ["all", "male", "female", "genderless", "unknown"],
  status: ["all", "alive", "dead", "unknown"]
};

const FormFieldset = filter => {
  const filterName = Object.keys(filter)[0];

  return (
    <fieldset className="filter__item-wrap">
      <legend className="filter__type-head">{filterName}</legend>
      {filter[Object.keys(filter)].map((item, i) => {
        return (
          <label key={i} className="filter__item">
            <input
              type="radio"
              name={filterName}
              value={item === "all" ? "" : item}
              defaultChecked={item === "all" ? true : false}
            />
            {item}
          </label>
        );
      })}
    </fieldset>
  );
};

const Aside = props => {
  return (
    <aside className="sidebar">
      <form onSubmit={props.formSubmitHandler} className="filter">
        <section>
          <h2 className="filter__heading">Search:</h2>
          <label>
            <input
              type="search"
              name="name"
              placeholder="Search by name or ID"
            />
          </label>
        </section>

        <section>
          <h2 className="filter__heading">Sorting:</h2>
          <fieldset className="filter__item-wrap">
            <legend className="filter__type-head">Name</legend>
            <label className="filter__item">
              <input type="radio" name="sort" value="asc-name" />
              asc
            </label>
            <label className="filter__item">
              <input type="radio" name="sort" value="desc-name" />
              desc
            </label>
          </fieldset>
          <fieldset className="filter__item-wrap">
            <legend className="filter__type-head">ID</legend>
            <label className="filter__item">
              <input type="radio" name="sort" defaultChecked value="asc-id" />
              asc
            </label>
            <label className="filter__item">
              <input type="radio" name="sort" value="desc-id" />
              desc
            </label>
          </fieldset>
        </section>

        <section>
          <h2 className="filter__heading">Filtering:</h2>
          <FormFieldset species={filterOptions.species} />
          <FormFieldset status={filterOptions.status} />
          <FormFieldset gender={filterOptions.gender} />
        </section>

        <button className="filter__btn" type="submit">
          Submit
        </button>
        <button className="filter__btn" type="button">
          <a href="/react-rick-and-morty/">Reset</a>
        </button>
      </form>
    </aside>
  );
};

export default Aside;
