import React, { useState } from "react";
import axios from "axios";

const AddTaskForm = ({ sprintId, onTaskAdded }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: sprint } = await axios.post(
        `https://task-server-miqx.onrender.com/sprints/${sprintId}/tasks`,
        {
          type,
          description,
          assignee,
          status,
        }
      );

      onTaskAdded(sprint);
      setType("");
      setDescription("");
      setAssignee("");
      setStatus("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="assignee">Assignee:</label>
        <input
          type="text"
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">-- Select Status --</option>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
