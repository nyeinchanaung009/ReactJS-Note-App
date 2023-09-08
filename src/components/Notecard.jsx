import React, { useContext,memo } from 'react'
import Context from '../MyContext'
import { Link } from 'react-router-dom';

const Notecard = memo(({mynote,deletenote,isselect,makeselect,selectedid}) => {

  const {highlights,setHighlights} = useContext(Context);

  const highlightHandler = (id) => {
    let res = [];
    if(highlights.includes(id)){
      res = highlights.filter(val => val != id);
    }else{
      res = [id,...highlights];
    }
    setHighlights(res);
    localStorage.setItem('highlightnotes',JSON.stringify(res));
  }

  return (
    <div className={selectedid.includes(mynote.id) ? 'relative hover:bg-dark1 bg-dark2 w-[95%] sm:w-[305px] md:w-[320px] rounded-md shadow-md  sm:mx-5 mb-5 ring-2 ring-accent ring-inset '  : 'relative hover:bg-dark1 bg-dark2 w-[95%] sm:w-[305px] md:w-[320px] rounded-md shadow-md  sm:mx-5 mb-5 border border-bordercolor'}>
      
      <div className='flex justify-between items-center flex-wrap pt-2 px-3'>
          <h1 className='text-xs text-secondarytext'><i className="bi bi-clock text-md me-2 text-accent"></i>{mynote.created_at}</h1>
          <div className='group hover:bg-bordercolor duration-200 px-1 py-0 rounded-full text-normaltext'>
            <i className="bi bi-three-dots-vertical"></i>
            { !isselect &&
            <div id='options' className="group-hover:block duration-1000 hidden absolute right-3 top-7 bg-white text-slate-700 rounded z-30 border border-bordercolor">
              <div>
                <button onClick={() => highlightHandler(mynote.id)} className='block text-start font-medium w-full py-3 ps-3 pe-10 hover:bg-slate-100 border-b border-bordercolor2'><i className="bi bi-bookmark me-3 drop-shadow-md text-accent"></i>Highlight</button>
                <button onClick={() => deletenote(mynote,true)} className='block text-start font-medium w-full py-3 ps-3 pe-10 hover:bg-slate-100'><i className="bi bi-trash3 me-3 drop-shadow-md text-accent"></i>Delete</button>
              </div>
            </div>
            }
          </div>
      </div>
      <Link to={`/createnote/${mynote.id}`} className={isselect ? 'pointer-events-none' : ''}>
        <div className='mt-2 pb-1'>
          <p className=' text-normaltext py-2 px-3'>{mynote.title == null ? mynote.body.substr(0,25) + '. . .' : mynote.title}</p>
        </div>
      </Link>
      
      {isselect &&
      <div id='select' className='absolute right-4 top-2 z-40' >
        <input defaultChecked={selectedid.includes(mynote.id) ? 'checked' : ''} onChange={() => makeselect(mynote.id)} type="checkbox" className='p-3 scale-[1.6] accent-accent' />
      </div>
      }
    </div>
  )
})

export default Notecard 