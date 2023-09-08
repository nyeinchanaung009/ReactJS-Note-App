import React,{memo} from 'react'

const SaveChanges = memo(({openstatus,cancelsave,savechange}) => {
  return (
    <>
        <div className={openstatus ? 'fixed top-0 left-0 w-full z-50 h-screen bg-neutral-600/30 backdrop-blur-sm' : 'hidden absolute top-0 left-0 w-full h-screen bg-neutral-600/30 backdrop-blur-sm'} >
            <div onClick={cancelsave} className='h-full flex justify-center items-center'>
                <div className='w-[295px] rounded-md bg-neutral-100 shadow overflow-hidden'>
                    <div className='text-center py-4'>
                        <i className="bi bi-check2-circle text-5xl text-accent my-4 inline-block"></i>
                        <h1 className='text-slate-700 font-semibold text-lg'>Save Changes</h1>
                        <p className='text-slate-600 text-center font-poppins text-sm'>Do you want to save ?</p>
                    </div>
                    <div className='flex justify-between items-center mt-4 border-t border-bordercolor2'>
                        <button className='flex-1 py-2 border-r border-bordercolor2 hover:opacity-80 duration-100'>No</button>
                        <button onClick={() => savechange()} className='flex-1 py-2 bg-accent text-white hover:opacity-80 duration-100'><i className="bi bi-check-circle me-2 text-lg"></i>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
})

export default SaveChanges