import React, { useState, useEffect, useRef } from 'react';

interface Pokemon {
    name: string;
    url: string;
  }

const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const clickedRef = useRef(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Populate input with the clicked Pokémon's name
  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
    clickedRef.current = true; // Mark that the update is from a click
  };

  // Function to fetch Pokémon data from the API
  const fetchPokemon = async (searchQuery: string) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      // Fetching the Pokémon data from the API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`); // Getting up to 1000 Pokémon
      const data = await response.json();

      // Filter Pokémon names based on searchQuery (case insensitive) - only matching the beginning
      const filteredPokemon = data.results.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

      setSuggestions(filteredPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clickedRef.current) {
        clickedRef.current = false;
        return; 
    }
  
    const timer = setTimeout(() => {
      fetchPokemon(inputValue);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [inputValue]);


  return (
    <div className="autocomplete">
      <div className="autocomplete-title">Search por Pokémon</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for Pokémon..."
        className="autocomplete-input"
      />
      {loading && <div className="loading">Loading...</div>}
      <ul className="suggestions-list">
        {suggestions.map(pokemon => (
          <li key={pokemon.name} className="suggestion-item" onClick={() => handleSuggestionClick(pokemon.name)}>
            {highlightMatch(pokemon.name, inputValue)}
          </li>
        ))}
      </ul>
    </div>
  );
};

const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
      <span key={index} style={{ fontWeight: part.toLowerCase() === query.toLowerCase() ? 'bold' : 'normal' }}>
        {part}
      </span>
    ));
  };

export default Autocomplete;
