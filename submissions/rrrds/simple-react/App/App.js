import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navigation from "../Navigation";
import Home from "../Home";
import CharacterList from "../CharacterList";
import { Character } from "../Character";
import LocationList from "../LocationList";
import { Location } from "../Location";
import EpisodeList from "../EpisodeList";
import { Episode } from "../Episode";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />

        <main className="main">
          <Route path="/" exact component={Home} />
          <Route path="/character/" exact component={CharacterList} />
          <Route path="/character/:id" exact component={Character} />
          <Route path="/location/" exact component={LocationList} />
          <Route path="/location/:id" exact component={Location} />
          <Route path="/episode/" exact component={EpisodeList} />
          <Route path="/episode/:id" exact component={Episode} />
        </main>
      </div>
    </Router>
  );
}

export default App;
