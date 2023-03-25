import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";

import AddTaskForm from "./Task";

function Sprint() {
  const navigate = useNavigate();
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://task-server-miqx.onrender.com/sprints", {
        name: sprintName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      console.log(response);
      setTasks(response.data);
      setSprintName("");
      setStartDate("");
      setEndDate("");
      navigate("/task");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <h2>Create Sprint</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px dotted red",
          width: "50vw",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <div>
          <label htmlFor="sprintName">Sprint Name</label>
          <Input
            width={"20vw"}
            type="text"
            id="sprintName"
            value={sprintName}
            onChange={(e) => setSprintName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <Input
            width={"20vw"}
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <Input
            width={"20vw"}
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Create</Button>
      </form>

      {/* {tasks.map((task) => (
        <AddTaskForm key={task._id} sprintId={task._id} task={task} />
      ))} */}
    </div>
  );
}

export default Sprint;
