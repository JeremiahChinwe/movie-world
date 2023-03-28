import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import searchIcon from './search.svg'
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])

  useEffect(() => {
    searchMovies("star wars")
  }, [])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Movies"
         />

         <img 
         src={searchIcon}
         alt="A Search Icon"
         onClick={() => searchMovies(searchTerm)}
         />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, id) => (
            <MovieCard movie={movie} key={id} />
          ))}
        </div>

      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
