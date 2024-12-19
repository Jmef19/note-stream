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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!deliveryNote) {
    return <div>No delivery note found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Delivery Note Details</h2>
        <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
          &#x2715;
        </button>
      </div>
      <div className="mt-4">
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
          <div className="mt-2">
            <h4 className="font-semibold">Address</h4>
            <p>
              {deliveryNote.client.address.street}{" "}
              {deliveryNote.client.address.number}
            </p>
            <p>
              {deliveryNote.client.address.city},{" "}
              {deliveryNote.client.address.province},{" "}
              {deliveryNote.client.address.postal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotesDetails;
