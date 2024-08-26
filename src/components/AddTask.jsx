import { useState } from "react"
import axios from "axios";

const AddTask = () => 
{
  const today = new Date().toLocaleString();
  const [formInput, setFormInput] = useState({
    title: '',
    category: '',
    status: false,
    date: today,
  });
  const [message, setMessage] = useState('');

  const { title, category, status, date } = formInput;

  const getInput = (e) =>
  {
    setFormInput({ ...formInput, [e.target.name]: e.target.value});
    console.log(formInput);
  }

  const submitInput = async (e) =>
  {
    e.preventDefault();

    try
    {
      let resp = await axios.post("http://localhost:3002/createtodo",
      {
        title, category, status, date
      });
      let data = resp.data;
      console.log(data);
      location.reload();
      // setMessage("Successful");
    }
    catch(error)
    {
      console.error(error.response.data);
      setMessage("Failed");
    }
  }

  return (
    <>
      <div className="form">
        <h1>Add task</h1>
        <form onSubmit={submitInput}>
          <input type="text"  name="title" value={title} placeholder="Title" onChange={getInput} />
          <input type="text"  name="category" value={category} placeholder="Category" onChange={getInput} />
          <button type="submit" className="form-btn">Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddTask