import React from 'react';
import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';

const Browse = () => {
  useNowPlayingMovies();
  useTopRated();
  usePopularMovies();
   useUpcomingMovies();
  return (
    <div>
        <Header />
        <MainContainer/>
        <SecondaryContainer/>
      
    </div>
  )
}

export default Browse
