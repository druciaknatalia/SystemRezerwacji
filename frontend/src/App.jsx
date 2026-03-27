import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
 "https://systemrezerwacji-backend-eth4e9c9abcrd7hp.spaincentral-01.azurewebsites.net/api";

function App() {
 const [reservations, setReservations] = useState([]);
 const [clientName, setClientName] = useState("");
 const [serviceName, setServiceName] = useState("");
 const [date, setDate] = useState("");
 const [time, setTime] = useState("");
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const [availability, setAvailability] = useState("");

 const fetchReservations = async () => {
   try {
     setError("");

     const response = await fetch(`${API_URL}/Reservations`);
     if (!response.ok) throw new Error("Błąd pobierania rezerwacji");

     const data = await response.json();
     setReservations(data);
   } catch (err) {
     console.error(err);
     setError("Nie udało się pobrać rezerwacji.");
   }
 };

 useEffect(() => {
   fetchReservations();
 }, []);

 const buildDateTime = () => {
   if (!date || !time) return null;
   return `${date}T${time}:00`;
 };

 const checkAvailability = async () => {
   const reservationDate = buildDateTime();

   if (!reservationDate) {
     setAvailability("Wybierz datę i godzinę.");
     return;
   }

   try {
     const response = await fetch(
       `${API_URL}/Reservations/check?reservationDate=${encodeURIComponent(reservationDate)}`
     );

     if (!response.ok) throw new Error("Błąd sprawdzania terminu");

     const data = await response.json();

     if (data.isAvailable) {
       setAvailability("Termin jest wolny.");
     } else {
       setAvailability("Termin jest zajęty.");
     }
   } catch (err) {
     console.error(err);
     setAvailability("Nie udało się sprawdzić terminu.");
   }
 };

 const handleAddReservation = async () => {
   const reservationDate = buildDateTime();

   if (!clientName.trim() || !serviceName.trim() || !reservationDate) {
     setError("Uzupełnij wszystkie pola.");
     return;
   }

   try {
     setError("");
     setMessage("");

     const response = await fetch(`${API_URL}/Reservations`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         clientName,
         serviceName,
         reservationDate,
         isConfirmed: true
       })
     });

     if (response.status === 409) {
       setError("Ten termin jest już zajęty.");
       return;
     }

     if (!response.ok) {
       throw new Error("Błąd dodawania rezerwacji");
     }

     setClientName("");
     setServiceName("");
     setDate("");
     setTime("");
     setAvailability("");
     setMessage("Rezerwacja została dodana.");
     await fetchReservations();
   } catch (err) {
     console.error(err);
     setError("Nie udało się dodać rezerwacji.");
   }
 };

 const handleDeleteReservation = async (id) => {
   try {
     const response = await fetch(`${API_URL}/Reservations/${id}`, {
       method: "DELETE"
     });

     if (!response.ok) throw new Error("Błąd usuwania");

     await fetchReservations();
   } catch (err) {
     console.error(err);
     setError("Nie udało się usunąć rezerwacji.");
   }
 };

 return (
   <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
     <h1>System Rezerwacji Wizyt</h1>

     <div style={{ display: "grid", gap: "12px", maxWidth: "420px", marginBottom: "24px" }}>
       <input
         type="text"
         placeholder="Imię i nazwisko klienta"
         value={clientName}
         onChange={(e) => setClientName(e.target.value)}
       />

       <input
         type="text"
         placeholder="Usługa"
         value={serviceName}
         onChange={(e) => setServiceName(e.target.value)}
       />

       <input
         type="date"
         value={date}
         onChange={(e) => setDate(e.target.value)}
       />

       <input
         type="time"
         value={time}
         onChange={(e) => setTime(e.target.value)}
       />

       <div style={{ display: "flex", gap: "10px" }}>
         <button onClick={checkAvailability}>Sprawdź termin</button>
         <button onClick={handleAddReservation}>Zarezerwuj</button>
       </div>
     </div>

     {availability && <p>{availability}</p>}
     {message && <p style={{ color: "green" }}>{message}</p>}
     {error && <p style={{ color: "brown" }}>{error}</p>}

     <h2>Lista rezerwacji</h2>

     <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
       <thead>
         <tr>
           <th>ID</th>
           <th>Klient</th>
           <th>Usługa</th>
           <th>Termin</th>
           <th>Status</th>
           <th>Akcja</th>
         </tr>
       </thead>
       <tbody>
         {reservations.length > 0 ? (
           reservations.map((reservation) => (
             <tr key={reservation.id}>
               <td>{reservation.id}</td>
               <td>{reservation.clientName}</td>
               <td>{reservation.serviceName}</td>
               <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
               <td>{reservation.isConfirmed ? "Potwierdzona" : "Oczekuje"}</td>
               <td>
                 <button onClick={() => handleDeleteReservation(reservation.id)}>
                   Usuń
                 </button>
               </td>
             </tr>
           ))
         ) : (
           <tr>
             <td colSpan="6">Brak rezerwacji</td>
           </tr>
         )}
       </tbody>
     </table>
   </div>
 );
}

export default App;
