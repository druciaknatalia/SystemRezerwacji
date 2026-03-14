import { useEffect, useState } from "react";
import axios from "axios";

type TaskItem = {
  id: number;
  title: string;
  description?: string;
  isDone: boolean;
};

function Dashboard() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać danych z API.");
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Cloud App Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.isDone ? "Done" : "To do"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
