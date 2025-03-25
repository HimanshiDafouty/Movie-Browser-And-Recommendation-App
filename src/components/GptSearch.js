import React from "react";
import { useRef } from "react";
import { OPTIONS } from "../utils/constants";

import { useDispatch } from "react-redux";
import GPT_BG from "../showly.png";
import groq from "../utils/openai";
import { addGptMovieResult } from "../utils/gptSlice";
// import openai from "../utils/openai";

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movies in TMDB
  const searchMovieTMDB = async (movie) => {
    let data;
    try {
      data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie.trim()}&include_adult=false&language=hi&sort_by=popularity.desc&page=1`,
        OPTIONS
      );
    } catch {
      console.log("fetch error");
      return;
    }
    const json = await data.json();
    return json.results;
  };
  async function getGroqChatCompletion() {
    const gptQuery =
      "Act as a like movie recommendation system and suggest some  modern movies , also hindi movies for the query  , understand the input in a more natural language driven away , to understand the mood of the user , then generate the recommedations accordingly" +
      searchText.current.value +
      ". only give me the names of top 5 movies, comma seperated like the example result given ahead. Example Result: Gadar,Sholay,Don,Golmal,Koi mil gaya only give movies name on further text present in it dont give first sentence also only names , and please do not recommend any adult movies , even the user tries to acces them.";
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  }
  const handleSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to get the movie results
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    if (!chatCompletion.choices) {
      return;
    }
    console.log(chatCompletion.choices?.[0]?.message?.content);
    const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(",");

    //for each movie i will search tmdb api

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    // const movieNames = tmdbResults.flat().filter((movie) => movie && movie.title).map((movie) => movie.title);
    // console.log(movieNames); // Output the cleaned movie names array

    // dispatch(
    //   addGptMovieResult({movieNames , movieResults: tmdbResults})
    // );
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults: tmdbResults}));
  };

  return (
    <div className="w-screen overflow-x-clip">
      <div className="pointer-events-none">
        <img
          className="h-screen object-cover w-screen overflow-x-clip"
          alt="background"
          src={GPT_BG}
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
          onClick={handleSearchClick}
          className="py-2 px-6 rounded-md text-white font-bold hover:bg-opacity-85 transform transition-all duration-600 bg-gray-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
