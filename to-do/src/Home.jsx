import React, { useEffect, useState } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import "./App.css"

function Home() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState(""); // Search term state
  const token = localStorage.getItem("token"); // Get token from local storage
  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/get?search=${search}`, {
      headers: { Authorization: token },
    })
    .then(result => setTodos(result.data))
    .catch(err => console.log(err));
  }, [search]); // ✅ Only runs when search changes


  const handleStatusChange = (id, newStatus) => {
    axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`, { status: newStatus },  {
      headers: { Authorization: token },
    })
      .then(() => window.location.reload()) // Refresh tasks after status update
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
      headers: { Authorization: token },
    })
      .then(() => window.location.reload()) // Refresh tasks after deletion
      .catch(err => console.log(err));
  };

  const convertToIST = (gmtDate) => {
    let date = new Date(gmtDate);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toLocaleString("en-IN");
  };

  return (
    <div className="home">
      <h2>ToDo List</h2>
      <Create />
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search term on change
      />

      <br />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => {
          
          return (
            <div className="task" key={todo._id}>
              <div className="checkbox">
                <p style={{ color: todo.status === "EXPIRED" ? 'red' : 'black' }}>
                <strong>{todo.task}</strong> - <em>{todo.description}</em> {/* ✅ Show description */}
                <br /> (Deadline: {convertToIST(todo.deadline).toLocaleString()}) - 
                  <strong> {todo.status}</strong>
                </p>
              </div>

              {/* Status Update Dropdown */}
              <select value={todo.status} onChange={(e) => handleStatusChange(todo._id, e.target.value)}>
                <option value="ACTIVE">Active</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETE">Complete</option>
              </select>

              {/* Delete Button */}
              <button onClick={() => handleDelete(todo._id)}><BsFillTrashFill /></button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Home;
