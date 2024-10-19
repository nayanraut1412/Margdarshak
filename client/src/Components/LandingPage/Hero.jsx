import React from 'react'
import { ReactTyped } from "react-typed";
import consultant from "../../Assets/consultant.png";

const Hero = () => {
  return (
    <>
      <div className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2 ml-12 mt-12 md:mt-36 space-y-2 order-2 md:order-1'>
            <span className='text-1xl'>Welcome to Mentor Connect</span>
            <div className='flex space-x-1 text-2xl md:text-3xl'>
              <h1>Your gateway to expert</h1>
              {/* <span className='text-blue-700 font-bold'>Skill Development</span> */}
              <ReactTyped
                className='text-blue-700 font-bold'
                // typedRef={setTyped}
                strings={["Skill Development", "Resume Building",  "Career Guidance"]}
                typeSpeed={40}
                backSpeed={50}
                loop={true}
              />
            </div>
            <br />
            <p className='text-sm md:text-md text-justify'>
              Mentor Connect is a platform designed to bridge the gap between aspiring professionals and experienced mentors. It offers personalized career guidance, skill development, resume building, and networking opportunities, helping individuals grow and succeed in their careers. Whether you're preparing for job interviews or looking to advance in your field, Mentor Connect provides the support you need to reach your goals.
            </p>
          </div>
          <div className='md:w-1/2 ml-48 md:mt-24 mt-8 order-1'>
            <img src={consultant} alt='Hero' className='sm:w-[300px] sm:h-[300px]' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero