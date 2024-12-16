import { useState, useEffect } from "react";

function ClientDetails({ clientId, onClose }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientDetails = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error loading client details");
        }

        const data = await response.json();
        console.log(data);
        setClient(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching client details");
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!client || !client.address) {
    return <div>No client details available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Details</h2>
        <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
          &#x2715;
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{client.name}</h3>
        <p className="text-sm text-gray-500">CIF: {client.cif}</p>

        <div className="mt-4">
          <h4 className="font-semibold">Address</h4>
          <p>
            {client.address.street} {client.address.number}
          </p>
          <p>
            {client.address.city}, {client.address.province}
            {client.address.postal}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
