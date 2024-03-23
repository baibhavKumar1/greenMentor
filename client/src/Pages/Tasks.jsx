import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTask, UpdateTask, DeleteTask, CreateTask } from '../redux/TaskReducer/action'

const Tasks = () => {
  const task = useSelector((store) => store.TaskReducer.data)
  const [show, setShow] = useState(false)
  const [taskData, setTaskData] = useState("")
  const [display, setDisplay] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "", description: "", deadline: ""
  })
  const token = useSelector((store) => store.AuthReducer.token) || localStorage.getItem("token")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetTask(token))
  }, [dispatch, token])
  console.log(task);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTask);
    dispatch(CreateTask(newTask, token))
  }
  const handleUpdate=(item)=>{
    setDisplay(!display)
    setTaskData(item)
  }
  const handleTaskUpdate=(id)=>{
    dispatch(UpdateTask(id,taskData,token))
    setDisplay(!display)
  }
  const handleDelete= (id)=>{
    dispatch(DeleteTask(id,token))
  }
  return (
    <div className='h-screen flex flex-col justify-start items-center'>
      <div className='flex flex-col border p-4 m-4'>
        <div className='flex justify-between mb-2'>
          <p className='text-xl'>TASKS</p>
          <button className='border p-1 rounded' onClick={() => setShow(!show)}>Add New Task</button>
        </div>
        <div className={` ${show ? "block" : "hidden"} flex flex-col mb-2 *:p-1 rounded *:border gap-2 *:outline-none *:rounded`}>
          <input placeholder='Title' onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <input placeholder='Description' onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          <input type='datetime-local' placeholder='Deadline' onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
          <button className='bg-gray-200' onClick={handleSubmit}>Add</button>
        </div>
        <table className='border-separate border border-slate-500 border-spacing-2 table-fixed text-left'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Mark As Completed</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {task.length > 0 ? task.map((item) => {
              return (
                <tr key={item._id}>
                  <td className='border-b border-slate-500'><p>{item.title}</p></td>
                  <td className='border-l border-slate-500'><p>{item.description}</p></td>
                  <td className='border-slate-500'><p>Complete: {item.isCompleted ? "Yes" : "No"}</p></td>
                  <td className='border border-slate-500'><button onClick={()=>handleUpdate(item)}>Update</button></td>
                  <td className='border border-slate-500'><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
                </tr>
              )
            }) : <p>Loading</p>}

          </tbody>
        </table>
        <div className={` ${display ? "block" : "hidden"} flex flex-col mt-2 *:p-1 rounded *:border gap-2 *:outline-none *:rounded`}>
          <input placeholder='Title' value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
          <input placeholder='Description' value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
          <input type='datetime-local' value={taskData.deadline} placeholder='Deadline' onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} />
          <button className='bg-gray-200' onClick={()=>handleTaskUpdate(taskData._id)}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Tasks