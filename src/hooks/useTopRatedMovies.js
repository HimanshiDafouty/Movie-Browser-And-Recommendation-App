import { OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRated } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();
  const getTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRated(json.results));
  };

  useEffect(() =>{
    getTopRated();
  } , []);
};
export default useTopRated;