import React from 'react'
import { IMAGE_CDN } from '../utils/constants';


const MovieCard = ({posterPath}) => {
    if(!posterPath) return null;
  return (
    <div className='md:w-48 w-36 p-3 rounded-md'>
        <img className='rounded-md cursor-pointer shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg ' alt = 'Movie Crad' src ={IMAGE_CDN+ posterPath} />
      
    </div>
  )
}

export default MovieCard;
