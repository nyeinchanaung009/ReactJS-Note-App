import React, { useEffect, useRef, useState } from 'react'
import v4 from 'react-uuid'
import TaskCard from '../components/TaskCard'
import ConfirmModel from '../components/ConfirmModel'

const Tasks = () => {
  const inputRef = useRef();
  const [tasks,setTasks] = useState([]);
  const [ModalShow,setModalShow] = useState(false);
  const [deleteId,setDeleteId] = useState('');

  const addNewTask = () => {
    if(inputRef.current.value.length > 0){
      let newtask = {
          id : v4(),
          text : inputRef.current.value,
          isFinished : false
        };

      setTasks([...tasks,newtask]);
      localStorage.setItem('mytasks',JSON.stringify([...tasks,newtask]));
      inputRef.current.value = '';
    }
  }

  const addtaskbyenter = (e) => {
    if(e.key == 'Enter'){
      addNewTask();
    }
  }

  const isFinishTask = (id) => {
    let res = [];
    tasks.map(task => {
      if(task.id == id){
        res = [{id:task.id,text:task.text,isFinished:!task.isFinished},...res]
      }else{
        res = [...res,task];
      }
    })
    setTasks(res);
    localStorage.setItem('mytasks',JSON.stringify(res));
  }

  const deleteItem = (id) => {
    let res = tasks.filter(task => task.id != id );
    setTasks(res);
    localStorage.setItem('mytasks',JSON.stringify(res));
    setDeleteId('');
    setModalShow(false);
  }

  const confirmDelete = (id,status) => {
    setModalShow(status);
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setModalShow(false);
  }

  const checkLstorage = () => {
    if(localStorage.getItem('mytasks')){
      setTasks(JSON.parse(localStorage.getItem('mytasks')));
    }else{
      setTasks([
        {
          id : v4(),
          text : 'hangout with my bae💖',
          isFinished : false
        },
        {
          id : v4(),
          text : 'watch Po*n',
          isFinished : true
        },
        {
          id : v4(),
          text : 'develop new project',
          isFinished : false
        }
      ]);
    }
  }

  useEffect(() => {
    checkLstorage();
  },[]);

  return (
    <>
    
      <div className='w-11/12 md:w-8/12 lg:w-5/12 mx-auto min-h-[550px]'>
        
        <div className='mt-12 md:w-9/12 mx-auto '>
          <h1 className='text-normaltext mb-2'>Add new task</h1>
          <div className='flex justify-between items-stretch'>
            <input type="text" ref={inputRef} onKeyUp={addtaskbyenter} className='w-full bg-dark3 shadow py-2 px-3 text-normaltext border border-bordercolor2 rounded-l-md focus:outline-none focus:border focus:border-normaltext' placeholder='. . .' />
            <button onClick={addNewTask} className='px-4 bg-accent text-white rounded-r-md hover:opacity-80 duration-100'>Add</button>
          </div>
        </div>

        <div>
          <h1 className='mt-8 mb-5 text-normaltext text-lg'><i className="bi bi-list-ul text-xl me-2"></i>Tasks to do</h1>
          {
            tasks.length > 0 && tasks.filter(task => !task.isFinished).map(val => <TaskCard key={val.id} isfinish={isFinishTask} deletetask={confirmDelete} task={val} />)
          }
          {
            tasks.length == 0 && <h1 className='font-medium text-secondarytext font-lg text-center py-12'>-- Empty --</h1>
          }
        </div>

        {
          tasks.length > 0 && (
          <div className='mt-10'>
          <h1 className='mt-8 mb-5 text-normaltext text-lg'><i className="bi bi-list-check text-xl me-2"></i>Completed Tasks</h1>
          {
            tasks.filter(task => task.isFinished).map(val => <TaskCard key={val.id} isfinish={isFinishTask} deletetask={confirmDelete} task={val} />)
          }
          </div>
        )}

      </div>
      <ConfirmModel canceldel={cancelDelete} deleteitem={deleteItem} deleteid={deleteId} delstatus={ModalShow}/>
    </>
  )
}

export default Tasks