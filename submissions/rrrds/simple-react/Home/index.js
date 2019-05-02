import React from "react";
import heroImg from "./hero.jpg";
import "./home.css";

function Home() {
  return (
    <div
      className="hero-image"
      style={{ backgroundImage: `url(${heroImg})` }}
    />
  );
}

export default Home;
