import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1" , OPTIONS);

    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() =>{
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
