import React, { Component } from 'react';
import Downshift from "downshift";
import Cities from '../../Services/Cities';

const cities = Cities;

const Search = (props) =>{
    return(
        <form
            className="search"
            onSubmit={props.handleSearch}
        >
            <input
                onChange={props.handleInput}
                className={'search__input wrapperStyle--active'}
                placeholder={'Enter city or coordinates'}
                title={'Enter city or coordinates'}
                value={props.inputValue}
            />

            {/*autocomplete*/}
            <ul
                className={'search__autocomplete'}
            >
                {props.inputValue.length > 2 &&  props.needToAutocomplete  ? cities
                    .filter(val =>
                        new RegExp(props.inputValue, 'i')
                            .test(val))
                    .map((val, i) => (
                        <li
                            onClick={() => props.handleAutocomplete(val)}
                            key={i}
                        >
                            {val}
                        </li>
                    )) : ''}
            </ul>
            <button
                className={'search__button wrapperStyle--active'}
                type={'button'}
                title={'Search Weather'}
                onClick={props.handleSearch}
            >
                Search
            </button>

        </form>
    )
};

export default Search;

