import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom';
import React, { useEffect, useState, lazy, Suspense } from 'react'
import v4 from 'react-uuid'
import Context from './MyContext'

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ToastMessage from './components/ToastMessage';

import Home from './pages/Home';
const CreateNote = lazy(() => import('./pages/CreateNote'));
const Trash = lazy(() => import('./pages/Trash'));
const Tasks = lazy(() => import('./pages/Tasks'));

function App() {

  const storeNotes = localStorage.getItem('mynotes') ? JSON.parse(localStorage.getItem('mynotes')) : [
    {
      id : v4(),
      title : 'Bonus link',
      body : 'https://www.youtube.com/watch?v=mosApk2_Yl0',
      created_at : 'Wednesday, September 6 2023'
    },{
      id : v4(),
      title : 'Bonus link 2',
      body : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      created_at : 'Friday, September 1 2023'
    },{
      id : v4(),
      title : 'About me',
      body : 'https://github.com/nyeinchanaung009',
      created_at : 'Sunday, September 3 2023'
    },{
      id : v4(),
      title : null,
      body : `Some people can read War and Peace and come away thinking it is a simple adventure story. Others can read the ingredients on a chewing gum wrapper and unlock the secrets of the universe
      
      
      မောင်လှမျိုး (ချင်းချောင်းခြံ)`,
      created_at : 'Friday, August 4 2023'
    },
  ];

  const [notes,setNotes] = useState(storeNotes);

  const [darkmode,setDarkmode] = useState(localStorage.getItem('lightmode') == 'true' ? true : false);
  const [highlights,setHighlights] = useState(localStorage.getItem('highlightnotes') ? JSON.parse(localStorage.getItem('highlightnotes')) : []);
  const [deleteNotes,setDeleteNotes] = useState(localStorage.getItem('deletednotes') ? JSON.parse(localStorage.getItem('deletednotes')) : []);
  const [deleteDate,setDeleteDate] = useState(localStorage.getItem('deletedates') ? JSON.parse(localStorage.getItem('deletedates')) : []);
  const [messageShow,setMessageShow] = useState(false);
  const [noti,setNoti] = useState('note deleted');

  const changeDarkMode = () => {
    localStorage.setItem('lightmode',!darkmode);
    setDarkmode(pre => !pre);
  }

  const [isload,setisload] = useState(true);

  const makeToast = (text) => {
    setNoti(text);
    setMessageShow(true);

    setTimeout(() => {
      setNoti('');
      setMessageShow(false);
    },2500);
  }

  useEffect(() => {
    setTimeout(() => {
      setisload(false);
    },300);
  },[]);

  return (
    <>
    <section id="app" className={darkmode ? 'relative bg-bg' : 'darkMode relative bg-bg'}>
      <ToastMessage toastShow={messageShow} setToastShow={setMessageShow} message={noti} />

      <div id='loader' className={isload ? 'bg-bg fixed w-screen h-screen left-0 top-0 flex justify-center items-center z-50' : 'hidden'}>
        <div className='bg-accent rounded shadow text-white py-3 px-4 text-2xl'><i className="bi bi-journals"></i></div>
      </div>
      { !isload &&
      <Router> 
        <div className="md:flex justify-between items-start">
          <div className="relative md:h-screen w-12/12 md:w-1/12">
            <Sidebar/>
          </div>
          <div className="flex-1 pt-5 md:pt-0 p-3 md:p-14">
            <Topbar darkmode={changeDarkMode} />
            
            <Context.Provider value={{notes,setNotes,highlights,setHighlights,deleteNotes,setDeleteNotes,deleteDate,setDeleteDate,makeToast}}>
              
              <Routes>
                <Route path="/" exact element={ <Home/> } />
                <Route path="/createnote/:id" element={ <Suspense fallback={<Home/>}><CreateNote/></Suspense> } />
                <Route path="/trash" element={ <Suspense fallback={<Home/>}><Trash/></Suspense> } />
                <Route path="/tasks" element={ <Suspense fallback={<Home/>}><Tasks/></Suspense> } />
              </Routes>
              
              <div className='fixed bottom-6 lg:bottom-10 right-4 sm:right-7 lg:right-16 z-40'>
                <Link to='createnote/null' title='Add new note' className='inline-block px-2 py-1 bg-accent rounded-full hover:opacity-70 shadow'><i className="bi bi-plus text-4xl text-white"></i></Link>
              </div>

            </Context.Provider>

          </div>
        </div>
      </Router>  
      }
      <div className='text-normaltext font-montserrat text-xs text-center py-2 bg-bg border-t border-bordercolor'>Nyein Chan Aung : <a href="https://github.com/nyeinchanaung009" target='_blank' className='hover:text-accent hover:font-semibold'><i className="bi bi-github ms-2 me-1"></i> https://github.com/nyeinchanaung009</a></div>
      
    </section>
    </>
  )
}

export default App

