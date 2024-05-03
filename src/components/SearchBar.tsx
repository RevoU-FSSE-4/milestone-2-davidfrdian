import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setPokemon({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      alert(`Pokemon with name "${pokemonName}" doesn't exist.`);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPokemon();
    }
  };

  return (
    <>
      <div className="flex items-center mx-32 my-6">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-l-md py-2 px-4 block w-full focus:outline-none focus:border-green-400"
          placeholder="Search..."
        />
        <button
          disabled={!pokemonName}
          onClick={searchPokemon}
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r-md ${
            !pokemonName && "opacity-50 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>
      <div>
        {!pokemonChosen ? (
          <h1 className="text-3xl font-semibold">
            Please choose a Pokemon
          </h1>
        ) : (
          <>
            <h1 className="text-3xl mt-12 uppercase font-semibold">
              {pokemon.name}
            </h1>
            <img
              className="mx-auto block w-56"
              src={pokemon.img}
              alt={pokemon.name}
            />
            <div className="flex justify-center items-center">
              <div>
                <h3 className="bg-green-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm capitalize">
                  Species: {pokemon.species}
                </h3>
                <h3 className="bg-green-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm capitalize">Type: {pokemon.type}</h3>
                <h4 className="bg-green-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm">Hp: {pokemon.hp}</h4>
                <h4 className="bg-green-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm">Attack: {pokemon.attack}</h4>
                <h4 className="bg-green-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-16 text-left text-sm">Defense: {pokemon.defense}</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchBar;
