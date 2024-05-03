import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let allPokemon: Pokemon[] = [];
        let nextUrl = "https://pokeapi.co/api/v2/pokemon";

        while (nextUrl && allPokemon.length < 1000) { 
          const response = await axios.get(nextUrl);
          const data: Pokemon[] = response.data.results.map(
            (pokemon: Pokemon) => ({
              ...pokemon,
              name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            })
          );

          allPokemon = [...allPokemon, ...data];
          nextUrl = response.data.next;
        }

        setPokemonList(allPokemon);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Pokemon List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.map((pokemon, index) => (
            <li
              key={index}
              className="bg-emerald-200 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-green-800 duration-200 shadow-lg m-8"
            >
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name.toLowerCase()}.png`}
                alt={pokemon.name}
                className="mx-auto mb-2 w-40"
              />
              <p className="font-semibold text-center mb-6">{pokemon.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
