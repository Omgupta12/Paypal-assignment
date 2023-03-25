import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select,Text } from "@chakra-ui/react";

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
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Text fontSize='4xl' >Add Task</Text>
      <div>
        <label htmlFor="type">Type:</label>
        <Input
          width={"20vw"}
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <Input
          width={"20vw"}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="assignee">Assignee:</label>
        <Input
          width={"20vw"}
          type="text"
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <Select
          position={"center"}
          width={"20vw"}
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </Select>
      </div>
      <Button width={"20vw"} type="submit">
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;
