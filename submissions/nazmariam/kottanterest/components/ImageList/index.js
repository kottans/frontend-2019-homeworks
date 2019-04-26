import React from "react";
import "./style.css";

export const ImageList = (props) => {
    const imageElements = props.images.map(item => {
      const style = { animation: "onLoad " + Math.random() + "s linear" };
      return (
        <div key={item.id} className="card" style={style}>
          <img
            className="card-img-top"
            src={item.urls.small}
            alt={item.alt_description}
          />
          <p className="rate">{item.likes}</p>
          <a
            className="user-link"
            href={item.user.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.user.name}
          </a>
          <a
            className="unsplash-link"
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            on Unsplash
          </a>
        </div>
      );
    });
    return <div className="wrapper">{imageElements}</div>;

};
