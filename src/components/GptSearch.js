import React from "react";
import { useRef } from "react";
import { OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import GPT_BG from "../showly.png"

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movies in TMDB
  // const searchMovieTMDB = async (movie) => {
  //     const data = await fetch(
  //       "https://api.themoviedb.org/3/search/movie?query=" +
  //         movie +
  //         "&include_adult=false&language=en-US&page=1",
  //       OPTIONS
  //     );
  //     const json = await data.json();
  //     return json.results;
  // };
  return (
    <div className="w-screen overflow-x-clip">
      <div className="pointer-events-none">
        <img
          className="h-screen object-cover w-screen overflow-x-clip"
          alt="background"
          src= {GPT_BG}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-44 md:top-28 transform-cpu translate-x-[-50%] left-[50%] flex justify-center gap-2  "
      >
        <input
          ref={searchText}
          type="text"
          className="focus:outline-none p-2 rounded-md md:w-96 w-[100%] "
          placeholder="What would you like to watch today?"
        />
        <button
          //   onClick={handleSearchClick}
          className="py-2 px-6 rounded-md text-white font-bold hover:bg-opacity-85 transform transition-all duration-600 bg-gray-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
