import React from 'react'
import LogIn from './LogIn'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <LogIn />
        },
        {
            path : "/Browse",
            element : <Browse />

        }
    ])
  return (
    <div>
        <RouterProvider router = {appRouter}/>

      
    </div>
  )
}

export default Body
