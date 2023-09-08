import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import v4 from 'react-uuid'

import Context from '../MyContext'
import SaveChanges from '../components/SaveChanges'


const CreateNote = () => {
  
  const navigate = useNavigate();
  const {notes,setNotes,deleteNotes,setDeleteNotes,makeToast} = useContext(Context);

  const Days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const [newTitle,setNewTitle] = useState('');
  const [newBody,setNewBody] = useState('');
  const [oldId,setOldId] = useState('');

  const [speak,setSpeak] = useState(false);

  const [openStatus,setOpenStatus] = useState(false);

  const [isChange,setIsChange] = useState(false);
  const [orgText,setOrgText] = useState('');
  const [orgTitle,setOrgTitle] = useState('');

  const {id} = useParams();
  var data ;

  const checkId = () => {
    data = notes.find(val => val.id == id);
    
    if(data != null){
      setNewTitle(data.title == null ? '' : data.title);
      setNewBody(data.body);
      setOldId(data.id)

      setOrgText(data.body);
      setOrgTitle(data.title == null ? '' : data.title);
    }else{
      navigate('/');
    }
  }

  useEffect(() => {
    if(id != 'null' ){
      checkId();
    }
  },[]);

  const addNewNote = () => {
    if(newBody.trim().length > 0){
      const date = new Date();
      const currentTime = `${Days[date.getDay()]}, ${Months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;

      const newNote = {
        id : oldId ? oldId : v4(),
        title : newTitle == '' ? null : newTitle,
        body : newBody,
        created_at : currentTime,
      }

      let res = [];
      if(id == 'null'){
        res = [newNote,...notes];
      }else{
        res = notes.map(val => val.id == id ? newNote : val);
      }

      setNotes(res);
      localStorage.setItem('mynotes',JSON.stringify(res));
      
      makeToast(id == 'null' ? 'Note Added' : 'Note Updated');
      navigate('/');
    }
  }

  const addnotebyenter = (e) => {
    // if(newBody.trim().length > 0){
    //   if(e.key == 'Enter'){
    //     setOpenStatus(true)
    //   }
    // }
  }

  let voice = new SpeechSynthesisUtterance(newBody);

  const  readAloud = () => {
    if(!speak){
      setSpeak(true);
      voice.lang = 'en-GB';
      voice.rate = 1.07;
      voice.pitch = 1.2;
      if(speechSynthesis.speaking){
        speechSynthesis.cancel();
      }
      speechSynthesis.speak(voice);
    }else{
      setSpeak(false);
      speechSynthesis.cancel();
    }
  }

  voice.addEventListener('end',function(){
    setSpeak(false);
  })

  window.onmouseup = function(e){
    if(e.target.id != 'reader'){
      if(speechSynthesis.speaking){
        setSpeak(false);
        speechSynthesis.cancel();
      }
    }
  }

  const openSaveModal = () => {
    if(newBody.trim().length > 0 && isChange){
      setOpenStatus(true);
    }
  }

  const closeSaveModal = () => {
    setOpenStatus(false);
    navigate('/');
  }

  const back = () => {
    if(isChange){
      setOpenStatus(true);
    }else{
      navigate('/');
    }
  }

  const checkisChange = () => {
    if(id != 'null'){
      orgText == newBody && orgTitle == newTitle ? setIsChange(false) : setIsChange(true);
    }else{
      newTitle.trim().length > 0 || newBody.trim().length > 0 ? setIsChange(true) : setIsChange(false);
    }
  }

  return (
    <>
      <div className='sticky top-16 md:top-0 border-b border-bordercolor2 bg-bg mt-6 py-5 mb-8 md:mb-2 w-11/12 md:w-9/12 lg:w-6/12 mx-auto flex justify-between items-center'>
        <button onClick={back} className='md:-translate-x-14 lg:-translate-x-28 text-secondarytext hover:text-accent duration-100'><i className="bi bi-arrow-left-circle text-2xl"></i></button>
        
        <div className={isChange ? '' : 'pointer-events-none opacity-40'}>
          <button onClick={openSaveModal} className='text-white font-semibold font-poppins px-6 py-1 rounded-sm bg-accent shadow-lg hover:opacity-70 duration-100 text-sm'><i className="bi bi-check2 text-base me-2"></i>{ oldId ? 'Update' : 'Save' }</button>
        </div>
        
      </div>
      <div className='w-11/12 md:w-9/12 lg:w-6/12 mx-auto mt-8'> 
        <div className='p-2 bg-grey text-normaltext font-poppins font-semibold flex justify-between items-center'>
          <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} onKeyUp={checkisChange} type="text" className='w-3/5 sm:w-2/5 bg-transparent font-light placeholder:text-slate-800 text-white text-sm px-2 py-1 rounded-sm ms-1 shadow-sm shadwo-inner outline-none border-2 border-white/60 focus:border-2 focus:border-white' placeholder='note title here . . .' />
          { newBody.trim().length > 0 &&
          <button id='reader' onClick={readAloud} className='text-neutral-100 font-normal text-xs border border-neutral-100 px-1 sm:px-3  hover:bg-slate-600 duration-100'><i className={speak ? 'bi bi-volume-up-fill me-1 text-base text-accent' : 'bi bi-volume-up  text-base'}></i>{ speak ? 'stop read' : 'Read aloud' }</button>
          }
        </div>
        <textarea autoFocus value={newBody} onChange={(e)=>setNewBody(e.target.value)} onKeyUp={checkisChange} className='w-full h-[530px] bg-dark2 shadow-lg border border-bordercolor focus:outline-none focus:border focus:border-bordercolor2 p-2 text-normaltext font-montserrat' placeholder='Type note here . . .'></textarea>
      </div>

      <SaveChanges openstatus={openStatus} cancelsave={closeSaveModal} savechange={addNewNote} />
    </>
  )
}

export default CreateNote