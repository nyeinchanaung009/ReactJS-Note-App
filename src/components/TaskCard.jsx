import React,{memo} from 'react'

const TaskCard = memo(({task,isfinish,deletetask}) => {
  return (
      <div className={task.isFinished ? 'opacity-80' : ''}>
        <div className='bg-dark2 rounded shadow-md p-3 mb-5 flex justify-between items-center border border-bordercolor'>
          <p className={task.isFinished ? 'line-through text-secondarytext text-sm font-montserrat flex-1 md:ps-2 pe-1 md:pe-0' : 'text-normaltext text-sm font-montserrat flex-1 md:ps-2 pe-1 md:pe-0'}>{task.text}</p>
          <div className='me-1 md:me-3'>
            <input type="checkbox"  defaultChecked={task.isFinished ? 'checked' : ''} onChange={() => isfinish(task.id)} className='scale-125' />
            <button onClick={() => deletetask(task.id,true)} className='hover:bg-dark1 duration-100 ms-3 md:ms-4 px-2 py-1 rounded-full'><i className="bi bi-trash3 text-lg text-accent "></i></button>
          </div>
        </div>
      </div>
      
    )
})

export default TaskCard