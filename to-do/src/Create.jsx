import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css"

function Create() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");


  useEffect(() => {
    const indiaTimeZoneOffset = 5.5 * 60; 
    const indiaDate = new Date(new Date().getTime() + indiaTimeZoneOffset * 60 * 1000);
    
   
    const formattedDate = indiaDate.toISOString().slice(0, 16); 
    setDeadline(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 

    if (!token) {
        alert("Unauthorized! Please log in.");
        return;
    }

  
    const localDate = new Date(deadline); 
    const indiaDate = new Date(localDate.getTime() - (5.5 * 60 * 60 * 1000)); 

    try {
        await axios.post(
            `${import.meta.env.VITE_API_URL}/add`,
            { task,description, deadline: indiaDate.toISOString() },
            {
                headers: { Authorization: token},
            }
        ).then(response => console.log(response.data))
        .catch(error => console.log("Error:", error));

        setTask("");
        setDescription("");
        setDeadline(""); 
        window.location.reload(); 
    } catch (error) {
        console.error("Error creating task:", error);
        alert("Error: " + (error.response?.data?.message || error.message));
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter description "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Create;
