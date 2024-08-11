function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Planner</h1>
      <div>
        <button className="outline outline-2  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Add Ticket
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
