import { FaUserPlus } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { HiTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import ClientForm from "./ClientForm";
import ClientDetails from "./ClientDetails";
import { useRouter } from "next/navigation";

function Clients() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/login");
      return;
    }

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("jwt");
      setIsLoggedIn(updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    fetchClients();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const fetchClients = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/client",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error loading clients");
      }

      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error(err.message || "No clients");
    } finally {
      setLoading(false);
    }
  };

  const addClient = () => {
    setMenuOpen(true);
  };

  const handleCloseAdding = () => {
    toggleMenu();
  };

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
    setShowClientDetails(true);
  };

  const handleCloseDetails = () => {
    setShowClientDetails(false);
  };

  const deleteClient = async (clientId) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting client");
      }

      fetchClients();
    } catch (err) {
      console.error(err.message || "Error deleting client");
    }
  };

  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-col w-2/3 p-4">
        <div className="flex items-center py-2">
          <h1 className="text-3xl font-bold">Clients</h1>
          <button
            className="h-8 ml-4 flex items-center justify-center"
            onClick={fetchClients}
          >
            <IoReload className="h-8 w-8" />
          </button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg p-3">
          {loading ? (
            <p>Loading clients...</p>
          ) : clients.length === 0 ? (
            <p>No clients.</p>
          ) : (
            <ul className="space-y-2">
              {clients.map((client) => (
                <li
                  key={client._id || client.id}
                  className="flex items-center space-x-4"
                >
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleClientClick(client._id || client.id)}
                  >
                    {client.name}
                  </button>
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => deleteClient(client._id || client.id)}
                  >
                    <HiTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <FaUserPlus
          className="h-16 w-auto cursor-pointer"
          onClick={addClient}
        />
        {menuOpen && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <ClientForm onClose={handleCloseAdding} />
          </div>
        )}
      </div>
      {showClientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ClientDetails
            clientId={selectedClientId}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
}

export default Clients;
