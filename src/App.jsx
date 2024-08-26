import { useState, useEffect } from 'react'
import axios from "axios"
import './App.scss'
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  useEffect(() =>
  {
    console.log("in useEffect");
    // console.log(import.meta.env.VITE_BACKENDURL + "todo");
    const fetchTasks = async () =>
    {
      // let resp = await axios.get("http://localhost:3002/todo");
      let resp = await axios.get(import.meta.env.VITE_BACKENDURL + "todo");
      let data = await resp.data;
      console.log("Data");
      console.log(data);
      setTasks(data);
      console.log("Tasks");
      console.log(tasks);
    }
    fetchTasks();
  }, []);

  const editTask = async (_id) =>
  {
    setId(_id);
    // console.log("This is id");
    // console.log(id);
    setIsEditing(true)
  }

  const deleteTask = async (id) =>
  {
    try
    {
      let resp = await axios.delete(`http://localhost:3002/deleteTodo/${id}`);
      let data = resp.data;
      console.log(data);
      location.reload();
      // setDeleteMsg("Task deleted");
    }
    catch (error)
    {
      console.error(error.response.data);
      setMessage("Failed");
    }
  }


  return (
    <>
      <Navbar />
      {
        !tasks ?

        (
          <h1>Fetching tasks</h1>
        )

        :

        (
          <div className="container">
            
            {
              isEditing ?

                (
                  <EditTask id={id} setIsEditing={setIsEditing}/>
                )

                :

                (
                    <AddTask />
                )
            }
            <div className="todo-list">
              {
                tasks.map((task) =>
                  <div className="card" key={task._id}>
                    <div>
                      <p>{task.title}</p>
                      <p className="text-muted">{task.date}</p>
                    </div>
                    <div>
                      <a href="#" className="mr-5" onClick={() => editTask(task._id)}>Edit</a>
                      <a href="#" onClick={() => deleteTask(task._id)}>Delete</a>
                    </div>
                  </div>

                )
              }
            </div>
          </div>
        )
      }
      
      <Footer />
    </>
  )
}

export default App
