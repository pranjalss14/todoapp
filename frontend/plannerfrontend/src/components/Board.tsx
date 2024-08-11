import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

function Board() {
  const [tickets, setTickets] = useState([]);
  const [ticketStatusNames, setTicketStatusNames] = useState([]);

  useEffect(() => {
    fetch("/api/tickets?owner=1")
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setTickets(data.data);

          // Extract the names from the ticket_status object within the meta field
          if (data.meta && data.meta.ticket_status) {
            const statusNames = Object.values(data.meta.ticket_status).map(
              (status) => status.name
            );
            setTicketStatusNames(statusNames);
          } else {
            console.error(
              "Unexpected API response structure: Missing meta.ticket_status"
            );
          }
        } else {
          console.error("Unexpected API response structure:", data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex overflow-auto">
      {ticketStatusNames.map((name, index) => (
        <div key={index} className="bg-gray-300 w-78 h-full p-4 mr-4">
          <p>{name}</p>
          {tickets
            .filter((ticket) => ticket.status === name)
            .map((ticket, ticketIndex) => (
              <Card key={ticketIndex} data={ticket} />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
