import React from 'react'

const ToastMessage = ({toastShow,setToastShow,message}) => {
  return (
    <>
    { toastShow &&
      <div id='toast' className='fixed right-5 md:right-12 z-50 top-20 md:top-6 w-[275px] md:[350px] mx-auto rounded bg-accent shadow p-2 font-montesrrat flex justify-between items-center'>
        <p className='text-white ps-5'><i className="bi bi-check-circle me-2"></i>{message}</p><i onClick={() => setToastShow(false)} className="bi bi-x-lg text-white text-lg hover:bg-white/50 hover:text-accent px-1 rounded-full"></i>
    </div>   
    }
    </>
    
  )
}

export default ToastMessage