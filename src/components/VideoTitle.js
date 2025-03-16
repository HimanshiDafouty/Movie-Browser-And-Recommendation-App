import React from 'react';
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";


const VideoTitle = ({title,overview}) => {
  return (
    <div className='absolute bg-gradient-to-r from-black text-white md:pt-[20%] pt-[35%] pl-10  w-screen aspect-video rounded-md'>
     <h1 className='md:text-5xl text-lg w-1/4 font-bold '>{title}</h1>
     <p className='md:py-6 py-2 md:w-1/3 w-9/12 md:text-lg text-[10px]'>{overview}</p>
     <div className='flex mt-3 gap-5'>
      <button className='bg-white md:px-10 md:py-2 px-3 py-1 flex gap-2 hover:bg-slate-200 transition-all duration-150 md:text-xl text-sm items-center rounded-sm text-black '><FaPlay size={15} />Play</button>
      <button className='bg-gray-400 md:px-10 md:py-2 px-3 md:text-xl text-sm hover:bg-slate-600 transition-all duration-150 bg-opacity-80 text-black  rounded-sm flex items-center gap-2 whitespace-nowrap '><IoIosInformationCircleOutline  size={20}/>More Info</button>
     </div>
    </div>
  )
}

export default VideoTitle
