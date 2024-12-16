import { FaPlusSquare } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { HiTrash } from "react-icons/hi";
import { FaFileDownload } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeliveryNotesForm from "./DeliveryNotesForm";

function DeliveryNotes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [DNotes, setDNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/login");
      return;
    }

    const handleStorageChange = () => {
      if (!localStorage.getItem("jwt")) {
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    fetchDeliveryNotes();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/deliverynote",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error loading delivery notes");

      const data = await response.json();
      setDNotes(data);
    } catch (error) {
      console.error(error.message || "Failed to load deliveryNotes.");
    } finally {
      setLoading(false);
    }
  };

  const deleteDNote = async (dnoteId) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/deliverynote/${dnoteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete delivery note");

      fetchDeliveryNotes();
    } catch (error) {
      console.error(error.message || "Failed to delete delivery note");
    }
  };

  const addDNote = () => {
    setMenuOpen(true);
  };

  const handleCloseAdding = () => {
    setMenuOpen(false);
  };

  const downloadDNote = async (dnoteId) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${dnoteId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to download delivery note");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `delivery_note_${dnoteId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error.message || "Failed to download delivery note");
    }
  };

  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-col w-2/3">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Delivery Notes</h1>
          <button
            className="h-8 ml-4 flex items-center justify-center"
            onClick={fetchDeliveryNotes}
          >
            <IoReload className="h-8 w-8" />
          </button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg p-3">
          {loading ? (
            <p>Loading delivery notes...</p>
          ) : DNotes.length === 0 ? (
            <p>No delivery notes available.</p>
          ) : (
            <ul className="space-y-2">
              {DNotes.map((DNote) => (
                <li key={DNote._id} className="flex items-center space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => openModal("details", DNote._id)}
                  >
                    {DNote.description}
                  </button>
                  <button
                    className="text-teal-500"
                    onClick={() => downloadDNote(DNote._id)}
                  >
                    <FaFileDownload />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteDNote(DNote._id)}
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
        <h1 className="text-3xl font-bold">Add New Delivery Note</h1>
        <FaPlusSquare
          className="h-16 w-auto cursor-pointer"
          onClick={addDNote}
        />
        {menuOpen && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <DeliveryNotesForm onClose={handleCloseAdding} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryNotes;
