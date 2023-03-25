import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sprint from "./pages/Sprint";
import AddTaskForm from "./pages/Task";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./hoc/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/sprint"
          element={
            <RequireAuth>
              <Sprint />
            </RequireAuth>
          }
        />
        <Route path="/task" element={<AddTaskForm />} />
      </Routes>
    </div>
  );
}

export default App;
