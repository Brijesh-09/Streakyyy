import React from 'react';
import Navbar from '../Components/Navbar';
import Hone from "../assets/home2.jpg"
import TestimonialSection from '../Components/Testimonals';
import Footer from '../Components/Footer';
import Contributions from '../Components/Contributions';
const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" w-screen flex justify-around p-4 bg-gray-100">
        <span className=" p-8 mt-24">
          <h2 className="text-4xl text-orange-400 font-bold">
            <span className="block">Organize your work</span>
            <span className="block">and life, finally.</span>
          </h2>
          <p className="text-xl pt-2">Manage your daily tasks and stay consistent</p>
          <p className="text-xl">Update your daily contributions to stay on track and maintain your streak.</p>

          <button className="text-xl m-1 font-semibold border-2 p-2 bg-orange-900 text-white cursor-pointer rounded-md">
            Start for free
          </button>
        </span>
        
        <div className=" p-4">
          <img 
            src={Hone}  
            alt="Your description"
            className="w-[500px] h-[500px] rounded-lg shadow-lg" // Tailwind classes for styling the image
          />
        </div>
      </div>
     <TestimonialSection/>
     <Contributions/>
     <Footer/>
         </>
  );
}

export default Home;
