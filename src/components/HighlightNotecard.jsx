import React, { useContext,memo } from 'react'
import { Link } from 'react-router-dom'
import Context from '../MyContext'

const HighlightNotecard = memo(({myhighlights,deletenote}) => {

  const {notes,setNotes,highlights,setHighlights,deleteNotes,setDeleteNotes} = useContext(Context);

  const highlightHandler = (id) => {
    let res = highlights.filter(val => val != id);
    setHighlights(res);
    localStorage.setItem('highlightnotes',JSON.stringify(res));
  }


  return (
    <>

      <div className='relative cursor-pointer hover:bg-dark1 bg-dark2 w-[95%] sm:w-[305px] md:w-[320px] rounded-md shadow-md  sm:mx-5 mb-5 border border-bordercolor'>
      
      <div className='flex justify-between items-center flex-wrap pt-2 px-3'>
          <h1 className='text-xs text-secondarytext'><i className="bi bi-clock text-md me-2 text-accent"></i>{ myhighlights.created_at }</h1>
          <div>
            <div className='inline-block group hover:bg-bordercolor duration-200 px-1 py-0 rounded-full text-normaltext'>
              <i className="bi bi-three-dots-vertical"></i>
              <div id='options' className="group-hover:block duration-1000 hidden absolute right-8 top-8 bg-white text-slate-700 rounded z-30 border border-bordercolor">
                <div>
                  <button onClick={() => highlightHandler(myhighlights.id)} className='block text-start font-medium w-full py-3 ps-3 pe-6 hover:bg-slate-100 border-b border-bordercolor2'><i className="bi bi-bookmark-x me-3 drop-shadow-md text-accent"></i>Remove from Highlight</button>
                  <button onClick={() => deletenote(myhighlights,true)} className='block text-start font-medium w-full py-3 ps-3 pe-6 hover:bg-slate-100'><i className="bi bi-trash3 me-3 drop-shadow-md text-accent"></i>Delete</button>
                </div>        
              </div>
            </div>
            <i className="bi bi-bookmark-fill inline-block drop-shadow-md -translate-y-4 text-accent2 ms-1"></i>
          </div>
      </div>

      <Link to={`/createnote/${myhighlights.id}`}>
        <div className='mt-2 pb-1'>
          <p className=' text-normaltext py-2 px-3'>{myhighlights.title == null ? myhighlights.body.substr(0,25) + '. . .' : myhighlights.title}</p>
        </div>
      </Link>
      
    </div>

    </>
    
  )
})

export default HighlightNotecard