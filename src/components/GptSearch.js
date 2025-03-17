import React from "react";
import { useRef } from "react";
import { OPTIONS } from "../utils/constants";

import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import GPT_BG from "../showly.png";
import openai from "../utils/openai";

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movies in TMDB
  const searchMovieTMDB = async (movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        OPTIONS
      );
      const json = await data.json();
      return json.results;
  };
  // async function getGroqChatCompletion() {

  //   return groq.chat.completions.create({
  //     messages: [
  //       {
  //         role: "user",
  //         content: gptQuery,
  //       },
  //     ],
  //     model: "llama3-8b-8192",
  //   });
  
  const handleSearchClick = async () => {
    console.log(searchText.current.value);
    
    const gptQuery =
    "Act as a like movie recommendation system and suggest some hindi movies for the query " +
    searchText.current.value +
    ". only give me the names of top 5 movies, comma seperated like the example result given ahead. Example Result: Gadar,Sholay,Don,Golmal,Koi mil gaya only give movies name on further text present in it dont give first sentence also only names.";
    const gptResults = await openai.chat.completions.create({
      messages :[{
        role: "user",
        content: searchText.current.value
      }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices);
  
  
    // const chatCompletion = await getGroqChatCompletion();
     // Print the completion returned by the LLM.
     if (!gptResults.choices) {
    }
    console.log(gptResults.choices[0]?.message?.content);
    const gptMovies = gptResults.choices[0]?.message?.content.split(",");
  
    //for each movie i will search tmdb api

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    
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
