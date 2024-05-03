import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";
import PokemonFavorite from "./components/PokemonFavorite";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/list" element={<PokemonList />} />
        <Route path="/favorite" element={<PokemonFavorite />} />
      </Routes>
    </div>
  );
}

export default App;
