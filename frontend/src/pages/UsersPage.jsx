import { useEffect, useState } from "react";
import axios from "axios";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać danych z API");
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista użytkowników</h1>

      {error && <p>{error}</p>}

      {users.length === 0 && !error ? (
        <p>Brak danych</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersPage;
