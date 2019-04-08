import React from 'react';


export const FavoriteCities = (props) => {
    return (
        <div className={"history wrapperStyle"}>
            <h1 className={"citites__title"}>Favorite cities</h1>
            {props.cities.map(item => {
                return (<li key={new Date().getTime() + Math.random()}>
                        <i className="fas fa-star remFromFav"
                           onClick={() => props.handleRemoveFavCity(item)}
                        >
                        </i>
                        <a href="#"
                           onClick={() => props.handleClick(item)}
                        >
                            {item}
                        </a>
                    </li>
                )
            })}
        </div>
    )
};

export default FavoriteCities;

