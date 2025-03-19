import React from 'react';
import GptSearch from './GptSearch';
import GptSuggestions from './GptSuggestions';



const GptSearchMain = () => {
  console.log("📌 Rendering GptSearchMain Component")
  return (
    <div>
        <GptSearch />
        <GptSuggestions />
        
      
    </div>
  )
}

export default GptSearchMain
