import React, { useContext, useEffect, useState } from 'react'
import TrashNotecard from '../components/TrashNotecard'
import Context from '../MyContext';
import ConfirmModel from '../components/ConfirmModel';

const Trash = () => {
  const {notes,setNotes,deleteNotes,setDeleteNotes,deleteDate,setDeleteDate,makeToast} = useContext(Context);
  const [modalshow,setModalShow] = useState(false);
  const [deleteId,setDeleteId] = useState();

  const deleteItem = (id) => {
    let ddate = deleteDate.filter(val => val.id != id);
    setDeleteDate(ddate);

    let delnote = deleteNotes.filter(val => val.id != id);
    setDeleteNotes(delnote);
    
    localStorage.setItem('deletednotes',JSON.stringify(delnote));
    localStorage.setItem('deletedates',JSON.stringify(ddate));

    makeToast('Note permanently deleted');
  }

  const confirmDelete = (id,status) => {
    setModalShow(status);
    setDeleteId(id);
  }

  const canceldel = () => {
    setModalShow(false);
  }

  const restore = (dnote) => {
    let upnote = [dnote,...notes];
    setNotes(upnote);

    deleteItem(dnote.id);

    localStorage.setItem('mynotes',JSON.stringify(upnote));

    makeToast('Note restored');
  }

  const check30day = () => {
    const today = new Date();
    const todaystring = today.toISOString().split('T')[0];
    
    deleteDate.map(val => val.pdDate == todaystring ? deleteItem(val.id) : '');
  }


  useEffect(() => {
    check30day();
  },[]);

  return (
    <>
      <div className='mt-16 min-h-screen'>
        <h1 className='text-center text-normaltext text-xl'><i className="bi bi-trash3 me-2"></i>Trash Notes</h1>
        <p className='text-secondarytext font-montserrat text-center text-sm my-3'>Trash notes will permanently delete in 30 days.</p>

        {
          deleteNotes.length > 0 &&
          <div className='flex flex-col justify-center items-center mt-8'>
            {
              deleteNotes.map(dnote => <TrashNotecard key={dnote.id} dnote={dnote} deleteTrash={confirmDelete} restorenote={restore} />)
            }
          </div>
        }
        {
          deleteNotes.length == 0 &&
          <div className='mt-16 text-center font-semibold text-secondarytext py-12 opacity-30'>
            <div>--- <i className="bi bi-file-earmark-excel-fill text-5xl px-5"></i> ---</div>
            <h1>Empty</h1>
          </div>
        }

      </div>
      <ConfirmModel deleteid={deleteId} delstatus={modalshow} deleteitem={deleteItem} canceldel={canceldel} />
    </>
  )
}

export default Trash