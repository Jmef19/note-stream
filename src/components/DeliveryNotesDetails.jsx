import React, { useEffect, useState } from "react";

const DeliveryNotesDetails = ({ onClose, deliveryNoteId }) => {
  const [deliveryNote, setDeliveryNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryNote = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/deliverynote/${deliveryNoteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching delivery note");
        }

        const data = await response.json();
        setDeliveryNote(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching delivery note");
        setLoading(false);
      }
    };

    if (deliveryNoteId) {
      fetchDeliveryNote();
    }
  }, [deliveryNoteId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {deliveryNote ? (
        <>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close delivery note details"
          >
            &#x2715;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Delivery Note Details</h2>
          <p className="text-lg">
            <strong>Date:</strong>{" "}
            {new Date(deliveryNote.date).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {deliveryNote.description}
          </p>
          <p className="text-lg">
            <strong>Project:</strong> {deliveryNote.project}
          </p>
          <p className="text-lg">
            <strong>Hours:</strong> {deliveryNote.hours}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-medium mb-2">Client Details</h3>
            <p>
              <strong>Name:</strong> {deliveryNote.client.name}
            </p>
            <p>
              <strong>CIF:</strong> {deliveryNote.client.cif}
            </p>
            <p>
              <strong>Address:</strong> {deliveryNote.client.address.street},{" "}
              {deliveryNote.client.address.number},{" "}
              {deliveryNote.client.address.city},{" "}
              {deliveryNote.client.address.province}{" "}
              {deliveryNote.client.address.postal}
            </p>
          </div>
        </>
      ) : (
        <div>No delivery note found</div>
      )}
    </div>
  );
};

export default DeliveryNotesDetails;
