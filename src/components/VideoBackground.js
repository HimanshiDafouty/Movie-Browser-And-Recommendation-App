import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = (movieId) => {
  const trailerVideo = useSelector((store) => store.movie?.trailerVideo);
  useMovieTrailer(movieId);
  const policy = "no-referrer";
  return (
    <div className="w-screen ">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&mute=1&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        referrerPolicy={policy}
      ></iframe>
    </div>
  );
};

export default VideoBackground;
