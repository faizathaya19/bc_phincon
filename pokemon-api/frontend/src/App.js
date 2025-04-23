import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isAutoSearch, setIsAutoSearch] = useState(false);

  const fetchPokemon = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/pokemon/${query}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setPokemon(null);
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    if (isAutoSearch) {
      fetchPokemon();
    }
  }, [isAutoSearch, fetchPokemon]);

  const handleSearch = () => {
    setIsAutoSearch(false);
    fetchPokemon();
  };

  return (
    <div className="app">
      <h1 className="title">Pokémon Search</h1>
      <div className="search-container">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          placeholder="Enter Pokémon name"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        <label className="switch">
          <input type="checkbox" checked={isAutoSearch} onChange={() => setIsAutoSearch(!isAutoSearch)} />
          <span className="slider"></span>
        </label>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {pokemon && pokemon.name ? (
        <div className="pokemon-details">
          <div className="card-container">
            <div className="pokemon-image-card">
              <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-text-card">
              <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
              <p className="pokemon-info">Height: {pokemon.height}</p>
              <p className="pokemon-info">Weight: {pokemon.weight}</p>
              <p className="pokemon-info">Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
              <div className="pokemon-stats">
                <h3>Stats</h3>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                  ))}
                </ul>
              </div>
              <div className="pokemon-moves">
                <h3>Moves</h3>
                <ul>
                  {pokemon.moves.slice(0, 5).map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : !loading && <p className="no-results">No Pokémon found.</p>}
    </div>
  );
}

export default App;
