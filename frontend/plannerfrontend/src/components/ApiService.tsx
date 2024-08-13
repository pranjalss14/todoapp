import axios from "axios";

export const deleteTicket = async (ticketId) => {
  try {
    await axios.delete(`/api/tickets/${ticketId}/`);
    console.log("Ticket deleted successfully");
    // Perform any additional actions after deletion, such as updating the UI
  } catch (error) {
    console.error("Failed to delete ticket:", error);
  }
};
