import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="absolute h-[520px] top-60 md:top-44 w-screen overflow-x-clip flex justify-center gap-3 text-white">
      <div className="relative flex flex-col overflow-x-clip overflow-scroll scrollbar-hide text-white">
        
        {movieNames.map((movieName,index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptSuggestions;
