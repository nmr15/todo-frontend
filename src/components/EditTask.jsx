import { useState } from "react"
import axios from "axios";

const EditTask = ({id, isEditing, setIsEditing}) => 
{
  const [formInput, setFormInput] = useState({
    title: '',
    category: '',
    status: false,
    date: Date.now(),
  });
  const [message, setMessage] = useState('');

  const { title, category, status, date } = formInput;

  const getInput = (e) =>
  {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    console.log(formInput);
  }

  const submitInput = async (e) =>
  {
    e.preventDefault();

    // console.log(typeof id);
    try
    {
      let resp = await axios.put(import.meta.env.VITE_BACKENDURL + `editTodo/${id}`,
        {
          title, category, status, date
        });
      let data = resp.data;
      console.log(data);
      setMessage("Edited");
      setIsEditing(false);
      location.reload();
    }
    catch (error)
    {
      console.error(error.response.data);
      setMessage("Failed");
    }
  }

  return (
    <>
      <div className="form">
        <h1>Edit task</h1>
        <h1>{message}</h1>
        <form onSubmit={submitInput}>
          <input type="text" name="title" value={title} placeholder="Title" onChange={getInput} />
          <input type="text" name="category" value={category} placeholder="Category" onChange={getInput} />
          <button className="form-btn mr-5" onClick={() => setIsEditing(false)}>Cancel</button>
          <button type="submit" className="form-btn">Submit</button>
        </form>
      </div>
    </>
  )
}

export default EditTask