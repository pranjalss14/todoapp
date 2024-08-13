import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";
import { deleteTicket } from "./ApiService";

function Board() {
  const [tickets, setTickets] = useState([]);
  const [ticketStatusNames, setTicketStatusNames] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/tickets?owner=1");
      const data = await response.json();
      if (data.data) {
        setTickets(data.data);
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleTicketDelete = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      fetchTickets(); // Refresh ticket list after deletion
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col justify-start items-start gap-[24px] p-[40px] bg-white">
      <span className="font-sans font-bold text-[32px] leading-none text-left text-[#212121]">
        Personal
      </span>
      <div className="flex w-full justify-between">
        <span className="font-sans text-[14px] text-left text-[#5a5a65]">
          A board to keep track of personal tasks.
        </span>
        <div className="w-14 h-[25px] flex items-center justify-center rounded-[5px] bg-[#2383e2] hover:bg-[#0077d4]">
          <span className="font-sans text-[14px] font-normal text-white">
            + Add
          </span>
        </div>
      </div>

      <div className="flex flex-nowrap overflow-x-auto w-full justify-start items-start p-[8px] rounded-[12px] bg-[#f8f8f8]">
        {ticketStatusNames.map((name, index) => (
          <div
            key={index}
            className="min-w-[308px] h-full flex flex-col justify-start items-start gap-[12px] p-[12px] rounded-[12px]"
          >
            <div className="flex flex-row items-center justify-center">
              <div
                className={`w-auto flex-grow-0 flex-col justify-start items-center gap-[10px] p-[2px_12px] rounded-[20px] ${
                  index === 0
                    ? "bg-[#FFE2DD]"
                    : index === ticketStatusNames.length - 1
                    ? "bg-[#DBEDDB]"
                    : "bg-[#FDECC8]"
                }`}
              >
                <span className="w-auto flex-grow-0 font-sans text-[16px] font-semibold leading-none text-left text-[#4d4d4d]">
                  {name}
                </span>
              </div>

              <div className="ml-3 font-sans text-[14px] text-[#a1a1aa]">
                {tickets.filter((ticket) => ticket.status === name).length}{" "}
                ticket(s)
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-[12px]">
              {tickets
                .filter((ticket) => ticket.status === name)
                .map((ticket, ticketIndex) => (
                  <Card
                    key={ticketIndex}
                    data={ticket}
                    onDelete={handleTicketDelete}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
