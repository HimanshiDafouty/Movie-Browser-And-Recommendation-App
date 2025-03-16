import { useEffect } from "react";
import { OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
  useEffect(() => {
    getUpComingMovies();
  }, []);
};
export default useUpcomingMovies;
