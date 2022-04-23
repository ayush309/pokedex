import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";

import Card from "./components/card/card";

import backgroundimage from "../src/pattern.png";

import { getPokemon, getAllPokemon } from "./services/pokemon";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [pokemonData, SetPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // const initialURL = "https://pokeapi.co/api/v2/pockemon/";
  const initialURL = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    SetPokemonData(_pokemonData);
  };

  // const [isDarkmode, setIsDarkmode] = useState(false);

  return (
    <>
      <div className="App" style={{ background: `url(${backgroundimage})` }}>
        {/* <Navbar /> */}
        <input
          className="inpt"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="search...."
        ></input>

        <div>
          {loading ? (
            <h1 style={{ textAlign: "center" }}>Loading Pokemon...</h1>
          ) : (
            <>
              <div className="btn">
                <button className="prev" onClick={prev}>
                  Prev
                </button>
                <button onClick={next}>Next</button>
              </div>
              <div className="grid-container">
                {pokemonData
                  .filter((pokemon) => {
                    if (searchTerm == "") {
                      return pokemon;
                    } else if (
                      pokemon.name
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return pokemon;
                    }
                  })
                  .map((pokemon, i) => {
                    return <Card key={i} pokemon={pokemon} />;
                  })}
              </div>
              <div className="btn">
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
