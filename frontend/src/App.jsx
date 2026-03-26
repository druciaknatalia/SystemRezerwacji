import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://systemrezerwacji-backend-eth4e9c9abcrd7hp.spaincentral-01.azurewebsites.net/api";

function App() {
 const [tasks, setTasks] = useState([]);
 const [newTitle, setNewTitle] = useState("");
 const [error, setError] = useState("");

 const fetchTasks = async () => {
   try {
     setError("");

     const response = await fetch(`${API_URL}/Tasks`);

     if (!response.ok) {
       throw new Error("Błąd pobierania danych");
     }

     const data = await response.json();
     setTasks(data);
   } catch (err) {
     setError("Nie udało się pobrać danych z API.");
     console.error(err);
   }
 };

 useEffect(() => {
   fetchTasks();
 }, []);

 const handleAddTask = async () => {
   if (!newTitle.trim()) {
     return;
   }

   try {
     setError("");

     const response = await fetch(`${API_URL}/Tasks`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         title: newTitle,
         description: "Dodane z frontendu Azure",
         isDone: false
       })
     });

     if (!response.ok) {
       throw new Error("Błąd dodawania");
     }

     setNewTitle("");
     await fetchTasks();
   } catch (err) {
     setError("Nie udało się dodać zadania.");
     console.error(err);
   }
 };

 return (
   <div style={{ padding: "40px" }}>
     <h1>Cloud App Dashboard</h1>

     <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
       <input
         type="text"
         placeholder="Wpisz nowe zadanie..."
         value={newTitle}
         onChange={(e) => setNewTitle(e.target.value)}
         style={{ width: "280px", padding: "8px" }}
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
         {tasks.map((task) => (
           <tr key={task.id}>
             <td>{task.id}</td>
             <td>{task.title}</td>
             <td>{task.description}</td>
             <td>{task.isDone ? "Zrobione" : "Do zrobienia"}</td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
}

export default App;
