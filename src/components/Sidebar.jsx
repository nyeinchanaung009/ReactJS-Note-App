import React,{memo} from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = memo(() => {

  return (
    <div className='fixed bg-dark2 md:h-screen w-full md:w-[12%] lg:w-1/12 flex justify-between items-center md:block z-50 shadow-md border-r border-bordercolor2'>
      <div className='flex-1 md:block flex justify-center items-center'>
        <div className='relative text-center my-4 md:my-0 py-1 md:py-12 lg:py-14 md:border-b border-bordercolor mx-3 sm:mx-8 md:mx-0'>
          <NavLink to='/' title='My Notes' className="navlink border border-bordercolor2 text-normaltext bg-dark3 hover:bg-dark1 text-xl px-3 py-2 md:px-5 md:py-4 rounded-md shadow-md"><i className="bi bi-journals"></i></NavLink>
          <div className='navlink-accent hidden absolute w-[4px] md:w-[10px] md:translate-x-3 rounded-r-md bottom-0 md:top-0 right-0 h-full bg-accent'></div>
        </div>
        <div className='relative text-center my-4 md:my-0 py-1 md:py-12 lg:py-14 md:border-b border-bordercolor mx-3 sm:mx-8 md:mx-0'>
          <NavLink to='/trash' title='Trash Notes' className="navlink border border-bordercolor2 text-normaltext bg-dark3 hover:bg-dark1 text-xl px-3 py-2 md:px-5 md:py-4 rounded-md shadow-md"><i className="bi bi-trash3"></i></NavLink>
          <div className='navlink-accent hidden absolute w-[4px] md:w-[10px] md:translate-x-3 rounded-r-md bottom-0 md:top-0 right-0 h-full bg-accent'></div>
        </div>
        <div className='relative text-center my-4 md:my-0 py-1 md:py-12 lg:py-14 mx-3 sm:mx-8 md:mx-0'>
          <NavLink to='/tasks' title='My Tasks' className="navlink border border-bordercolor2 text-normaltext bg-dark3 hover:bg-dark1 text-xl px-3 py-2 md:px-5 md:py-4 rounded-md shadow-md"><i className="bi bi-list-task"></i></NavLink>
          <div className='navlink-accent hidden absolute w-[4px] md:w-[10px] md:translate-x-3 rounded-r-md bottom-0 md:top-0 right-0 h-full bg-accent'></div>
        </div>
      </div>
    </div>
  )
})

export default Sidebar