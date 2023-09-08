import { memo } from "react";


const Topbar = memo(({darkmode}) => {
  return (
    <div className="sm:flex justify-between items-center mt-14 md:mt-3">
      <div className="">
        <h1 className='text-normaltext md:text-2xl font-montserrat tracking-wide font-light'>Get organized, Work smarter, Remember <span className='text-accent font-normal'>everything.</span></h1>
        <h1 className='text-secondarytext text-sm md:text-base font-poppins font-light md:tracking-widest'>The digital note-taking app for you.</h1>
      </div>
      <div className='pr-2 lg:pr-5 text-end mt-2 md:mt-0 p-3 md:p-0'>
       <button onClick={darkmode}><i className="bi bi-sun text-xl md:text-2xl text-normaltext hover:text-accent"></i></button>
      </div>
    </div>
  )
})

export default Topbar;