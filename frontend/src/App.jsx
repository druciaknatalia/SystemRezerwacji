import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://systemrezerwacji-backend-eth4e9c9abcrd7hp.spaincentral-01.azurewebsites.net/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/Tasks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`GET failed: ${response.status}`);
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchTasks error:", err);
      setError("Nie udało się pobrać danych z API.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;

    try {
      setError("");

      const payload = {
        title: newTitle,
        description: "Dodane z frontendu Azure",
        isDone: false,
      };

      const response = await fetch(`${API_URL}/Tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`POST failed: ${response.status}`);
      }

      setNewTitle("");
      await fetchTasks();
    } catch (err) {
      console.error("handleAddTask error:", err);
      setError("Nie udało się dodać zadania.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Cloud App Dashboard</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Wpisz nowe zadanie..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "320px", padding: "8px" }}
        />
        <button onClick={handleAddTask}>Dodaj Zadanie</button>
      </div>

      {error && <p style={{ color: "brown" }}>{error}</p>}

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.isDone ? "Zrobione" : "Do zrobienia"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Brak danych</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
