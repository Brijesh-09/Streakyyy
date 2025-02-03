import React from 'react'
import cont from "../assets/myto1.png"

const Contributions = () => {
  return (
    <div className=" w-screen flex justify-around p-4 bg-gray-100">
            <span className=" p-8 mt-24">
              <h2 className="text-4xl font-bold">
                <span className="block">Make Everyday Count</span>
                <span className="block">and stay consistent</span>
              </h2>
              <p className="text-xl pt-2">Add your daily contributions </p>
              <p className="text-xl font-semibold text-orange-400"> Don't Forget Streak resets to 0 😉 so make it countable</p>
            </span>
            
            <div className=" p-4">
              <img 
                src={cont}  
                alt="Your description"
                className="w-[800px] h-[500px] rounded-lg shadow-lg" // Tailwind classes for styling the image
              />
            </div>
          </div>
  )
}

export default Contributions