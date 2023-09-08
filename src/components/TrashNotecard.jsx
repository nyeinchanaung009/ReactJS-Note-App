import React, { useContext, useEffect } from 'react'
import Context from '../MyContext'

const TrashNotecard = ({dnote,deleteTrash,restorenote}) => {

  const {notes,setNotes,deleteNotes,setDeleteNotes,deleteDate,setDeleteDate} = useContext(Context);

  const remainDate = () => {
    const ddd = deleteDate.find(val => val.id == dnote.id);
    const remain_milliseconds = new Date(ddd.pdDate) - new Date();
    const remain = Math.floor(remain_milliseconds / 1000 / 60 / 60 /24);
    return Math.abs(remain);
  }

  useEffect(() => {
    remainDate();
  },[]);

  return (
    <div className='w-[98%] sm:w-[305px] md:w-[320px]'>

      <div className='relative bg-dark2  rounded-md shadow-md mb-1 sm:mx-5 border border-bordercolor'>
      
        <div className='flex justify-between items-center flex-wrap pt-2 px-3'>
          <h1 className='text-xs text-secondarytext'><i className="bi bi-clock text-md me-2 text-accent"></i>{dnote.created_at}</h1>
          <div className='group hover:bg-bordercolor duration-200 px-1 py-0 rounded-full text-normaltext'>
            <i className="bi bi-three-dots-vertical"></i>
            <div id='options' className="group-hover:block duration-1000 hidden absolute right-4 top-7 bg-slate-100 text-slate-700 rounded-md z-50 border border-bordercolor">
              <div>
                <button onClick={() => restorenote(dnote)} className='block text-start font-medium w-full py-3 px-5 hover:bg-slate-200 border-b border-bordercolor2'><i className="bi bi-arrow-counterclockwise me-3 drop-shadow-md text-accent"></i>Restore</button>
                <button onClick={() => deleteTrash(dnote.id,true)} className='block text-start font-medium w-full py-3 px-5 hover:bg-slate-200'><i className="bi bi-trash3 me-3 drop-shadow-md text-accent"></i>Delete permanent</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='mt-2 pb-1'>
            <p className='text-normaltext py-2 px-3'>{dnote.title == null ? dnote.body.substr(0,25) : dnote.title} . . .</p>
          </div>
        </div>

      </div>
      <div>
        <p className='text-right me-6 text-xs mb-5 text-secondarytext font-montserrat'>{remainDate()} {remainDate() > 1 ? 'days' : 'day'} left to auto delete.</p>
      </div>
    </div>
    
  )
}

export default TrashNotecard