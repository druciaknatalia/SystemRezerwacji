import { useEffect, useState } from "react";
import axios from "axios";

type TaskItem = {
 id: number;
 title: string;
 description: string;
 isDone: boolean;
};

function Dashboard() {
 const [tasks, setTasks] = useState<TaskItem[]>([]);
 const [title, setTitle] = useState("");
 const [error, setError] = useState("");

 const loadTasks = async () => {
   try {
     const response = await axios.get("http://localhost:8081/api/tasks");
     setTasks(response.data);
   } catch (err) {
     console.error(err);
     setError("Nie udało się pobrać danych z API.");
   }
 };

 useEffect(() => {
   loadTasks();
 }, []);

 const addTask = async () => {
   if (!title.trim()) return;

   try {
     await axios.post("http://localhost:8081/api/tasks", {
       title: title,
       description: "Dodane z React",
       isDone: false
     });

     setTitle("");
     setError("");
     loadTasks();
   } catch (err) {
     console.error(err);
     setError("Nie udało się dodać zadania.");
   }
 };

 return (
   <div style={{ padding: "20px", fontFamily: "Arial" }}>
     <h1>Cloud App Dashboard</h1>

     <div style={{ marginBottom: "20px" }}>
       <input
         type="text"
         placeholder="Wpisz nowe zadanie..."
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         style={{ padding: "8px", marginRight: "10px", width: "250px" }}
       />
       <button onClick={addTask} style={{ padding: "8px 16px" }}>
         Dodaj Zadanie
       </button>
     </div>

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
