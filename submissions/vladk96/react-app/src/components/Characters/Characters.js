import React, { Component } from "react";

import { getCharacters } from "../../api/api";

import { Filters } from "../Filters";

import { Character } from "../Character/";

import { Pagination } from "../Pagination";

import loaderImage from "../../images/spinner.svg";

import "./Characters.css";

class Characters extends Component {
  state = {
    search: "",
    gender: "",
    species: "",
    characters: [],
    currentPage: 1,
    isLoaded: false
  };

  async componentDidMount() {
    const list = await getCharacters();

    this.setState({
      characters: list.results,
      pages: list.info.pages,
      currentPage: list.info.currentPage,
      isLoaded: true
    });
  }

  handlePaginationClick = async event => {
    const clickedPageNumber = +event.target.textContent;
    const reqAttributes = this.getObjectForRequest(this.state);

    await this.setState({
      isLoaded: false,
      currentPage: clickedPageNumber
    });

    const list = await getCharacters(reqAttributes);

    this.setState({
      characters: list.results,
      pages: list.info.pages,
      isLoaded: true
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = async event => {
    const reqAttributes = this.getObjectForRequest(this.state);

    event.preventDefault();

    this.setState({ isLoaded: false });

    const list = await getCharacters(reqAttributes);

    this.setState({
      characters: list.results,
      pages: list.info.pages,
      currentPage: list.info.currentPage,
      isLoaded: true
    });
  };

  getObjectForRequest = ({ search, gender, species, currentPage }) => ({
    name: search,
    gender,
    species,
    currentPage
  });

  render() {
    const {
      characters,
      isLoaded,
      search,
      gender,
      species,
      currentPage,
      pages
    } = this.state;

    return (
      <div>
        {!isLoaded ? (
          <div className="preloader">
            <img src={loaderImage} alt="spinner" />
          </div>
        ) : (
          <>
            <Filters
              handleSubmit={this.handleFormSubmit}
              handleChange={this.handleInputChange}
              searchValue={search}
              genderValue={gender}
              speciesValue={species}
            />
            <div className="characters characters-background">
              {characters.map(character => (
                <Character
                  key={character.id}
                  imageSrc={character.image}
                  name={character.name}
                  species={character.species}
                  gender={character.gender}
                />
              ))}
            </div>
            <Pagination
              handleClick={this.handlePaginationClick}
              currentPage={currentPage}
              pages={pages}
            />
          </>
        )}
      </div>
    );
  }
}

export default Characters;
