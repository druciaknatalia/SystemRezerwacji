# Booker – System Rezerwacji Wizyt (2026)

**Autor:** Natalia Druciak  
**Nr albumu:** 96745

Projekt semestralny z zakresu budowy i administracji aplikacji w chmurze.  
Aplikacja realizowana w architekturze trójwarstwowej (Frontend + Backend + Baza danych).

---

## Stos technologiczny

- **Frontend:** React + Vite (HTTPS)
- **Backend:** Node.js + Express (REST API, JSON, HTTPS)
- **Baza danych:** Azure SQL Database

---

## Deklaracja architektury (Mapowanie na ułsugi Azure)

Projekt został zaplanowany z wykorzystaniem usług PaaS (Platform as a Service) w chmurze Microsoft Azure.

| Warstwa        | Komponent lokalny        | Usługa Azure              |
|----------------|--------------------------|---------------------------|
| Presentation   | React + Vite             | Azure Static Web Apps     |
| Application    | Node.js + Express (API)  | Azure App Service         |
| Data           | SQL                      | Azure SQL Database        |

---

## Struktura projektu

Projekt posiada strukturę zgodną z architekturą 3-warstwową:
Booker/
├─ frontend/
├─ backend/
├─ database/
├─ docs/
│ ├─ architecture.png
│ └─ architecture.mmd
└─ README.md

---

## Dokumentacja architektury

- Diagram C4 (Level 2) – rysunek: `docs/architecture.png`
- Diagram C4 (Level 2) – kod Mermaid: `docs/architecture.mmd`

---

## Status projektu

- [x] Artefakt 1 – Deklaracja projektu
- [x] Artefakt 1 – Struktura katalogów
- [x] Artefakt 1 – Diagram C4 (PNG)
- [x] Artefakt 1 – Diagram C4 (Mermaid)
- [x] Artefakt 2 – Docker i uruchomienie lokalne
- [x] Artefakt 3 - Frontend
- [x] Artefakt 4 - Działająca warstwa logiki backendu
- [x] Artefakt 5 - System gotowy na chmurę
- [x] Artefakt 6 - Aplikacja wdrożona w Azure
- [x] Artefakt 7 - Zabezpieczona aplikacja
- [x] Artefakt 8 - Wybudowany “bezpiecznik” i wdrożony automatu CI/CD
---

## Informacje dodatkowe

Projekt będzie rozwijany iteracyjnie w kolejnych etapach zajęć.  
W następnych fazach zostanie dodana konfiguracja środowiska, testy oraz wdrożenie do chmury.
Po migracji zakonczonej sukcesem migracji, aplikacja została zmodyfikowana, aby zamienić podstawową wersję formularza, na faktyczny system rezerwacji. Zmieniłam model danych na rezerwacje (klient, usługa, data i godzina), dodałam nowy kontroler w backendzie oraz logikę sprawdzania, czy termin jest już zajęty. Zaktualizowałam bazę danych przez migracje i naprawiłam połączenie z Azure SQL. Następnie przebudowałam frontend, dodając formularz rezerwacji, sprawdzanie dostępności i listę rezerwacji. Na końcu połączyłam frontend z backendem i wdrożyłam całość na Azure przez GitHub, dzięki czemu aplikacja działa online. 

## Baza danych

Ze względu na ograniczenia platformy Apple Silicon (Mac M5) zastosowano PostgreSQL zamiast SQL Server.
