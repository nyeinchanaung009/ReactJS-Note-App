import React, {  useContext, useEffect, useState } from 'react'


import Notecard from '../components/Notecard'
import HighlightNotecard from '../components/HighlightNotecard'
import Context from '../MyContext'
import ConfirmModel from '../components/ConfirmModel'

const Home = () => {
  const [modalshow,setModalShow] = useState(false);
  const [deleteId,setDeleteId] = useState();
  const [selectedId,setSelectedId] = useState([]);
  const [isSelect,setIsSelect] = useState(false);
  const {notes,setNotes,highlights,setHighlights,deleteNotes,setDeleteNotes,deleteDate,setDeleteDate,makeToast} = useContext(Context);

  const specificDate = new Date();
  specificDate.setDate(specificDate.getDate() + 31);
  const next30Days = specificDate.toISOString().split('T')[0];

  const deleteItem = (mynote) => {
    let ddate = [{pdDate : next30Days, id : mynote.id},...deleteDate];
    setDeleteDate(ddate);

    let dnote = [mynote,...deleteNotes];
    setDeleteNotes(dnote);

    let hnote = highlights.filter(val => val != mynote.id);
    setHighlights(hnote);

    let upnote = notes.filter(val => val.id != mynote.id);
    setNotes(upnote);

    localStorage.setItem('mynotes',JSON.stringify(upnote));
    localStorage.setItem('deletednotes',JSON.stringify(dnote));
    localStorage.setItem('deletedates',JSON.stringify(ddate));
    localStorage.setItem('highlightnotes',JSON.stringify(hnote));

    makeToast('Note Deleted');
  }

  const confirmDelete = (id,status) => {
    setModalShow(status);
    setDeleteId(id);
  }

  const canceldel = () => {
    setModalShow(false);
  }

  const makeSelect = (id) => {
    selectedId.includes(id) ? setSelectedId(selectedId.filter(val => val != id)) : setSelectedId([id,...selectedId]) 
  }

  const selectToggle = () => {
    isSelect ? setSelectedId([]) : '';
    setIsSelect(pre => !pre);
  }

  const multidelete = () => {
    let todelete = notes.filter(val => selectedId.includes(val.id));

    let ddate = [];
    var list = [];
    todelete.map(value => list.push({pdDate:next30Days,id:value.id}))
    ddate = [...list,...deleteDate];
    setDeleteDate(ddate);

    let dnote = [...todelete,...deleteNotes];
    setDeleteNotes(dnote);
 
    let hnote = highlights.filter(val => !selectedId.includes(val));
    console.log(hnote);
    setHighlights(hnote);
    
    let upnote = notes.filter(val => !selectedId.includes(val.id));
    setNotes(upnote);

    setIsSelect(false);
    setSelectedId([]);

    localStorage.setItem('mynotes',JSON.stringify(upnote));
    localStorage.setItem('deletednotes',JSON.stringify(dnote));
    localStorage.setItem('deletedates',JSON.stringify(ddate));
    localStorage.setItem('highlightnotes',JSON.stringify(hnote));

    makeToast('Notes Deleted');
  }

  const selectAll = () => {
    if(!isSelect) {
      setIsSelect(true);
      setSelectedId(notes.map(val => val.id));
    }else{
      setIsSelect(false);
      setSelectedId([]);
    }
  }

  return (
    <>
      <div className='text-normaltext mt-6 min-h-[85vh]  -translate-y-10 sm:translate-y-0'>

        {
        highlights.length > 0 &&
        <h1 className='text-textnormal text-lg md:ps-6'><span><i className="bi bi-bookmark me-2 text-xl"></i></span>Highight Notes</h1>
        }

        <div className='flex justify-center md:justify-start items-center mt-6 flex-wrap mb-6'>
          {
            notes.map(note => highlights.includes(note.id) ? <HighlightNotecard key={note.id} myhighlights={note} deletenote={confirmDelete} /> : '')
          }
        </div>

        <h1 className='text-textnormal text-lg md:ps-6 md:mt-10 pb-12 sm:pb-0'><span><i className="bi bi-journals me-2 text-xl"></i></span>My Notes</h1>

        <div className='relative flex justify-center md:justify-start items-center mt-6 flex-wrap'>
          <div className='scale-[90%] md:scale-100 absolute -top-[55px] sm:-top-[54px] right-4 sm:right-14 md:right-20 lg:right-32 flex'>
            <button onClick={() => setModalShow(true)} className={selectedId.length > 0 ? 'opacity-100 text-white font-light text-sm tracking-wider px-3 py-1 bg-accent border border-secondarytext hover:bg-slate-400 duration-50' : 'opacity-0'}> <i className="bi bi-trash3 me-1"></i>Delete</button>
            <div className='opacity-100 flex justify-between items-center text-sm ms-1 border border-secondarytext duration-75'>
              <button onClick={selectAll} className='text-normaltext hover:bg-slate-500 hover:text-white py-1 px-2'><i className="bi bi-list-check me-2"></i>Select all</button>
              <button onClick={selectToggle} className='text-normaltext border-l border-secondarytext hover:bg-slate-500 hover:text-white py-1 px-2'><i className="bi bi-check me-2"></i>{ isSelect ? 'Unselect' : 'Select' }</button>
            </div>
          </div>

          {
            notes.map(note => <Notecard key={note.id} mynote={note} deletenote={confirmDelete} isselect={isSelect} makeselect={makeSelect} selectedid={selectedId} />)
          }
        </div>

        

      </div>
      <ConfirmModel delstatus={modalshow} deleteid={deleteId} canceldel={canceldel} deleteitem={isSelect ? multidelete : deleteItem} />
    </>
  )
}

export default Home