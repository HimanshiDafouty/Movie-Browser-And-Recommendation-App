import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movie = useSelector((store) => store.movie?.nowPlayingMovies);

  if (!movie || movie.length === 0) return null;

  const mainMovie = movie[0];

  JSON.stringify(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-screen bg-black">
      {/* Background Video */}
      <VideoBackground movieId={id} />

      {/* Title & Description */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
