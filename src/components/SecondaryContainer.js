import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);
  return (
    <div className=' bg-black w-screen'>
      <div className='md:-mt-60 z-30 relative'>
        
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRated} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      {/* <MovieList title={"Horror"} movies={movies.nowPlayingMovies} /> */}
      </div>
    </div>
  )
}

export default SecondaryContainer
