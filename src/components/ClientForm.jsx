import { useState } from "react";
import Modal from "./Modal";

export default function ClientForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    cif: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (
      formData.name === "" ||
      formData.cif === "" ||
      formData.address.street === "" ||
      formData.address.number === "" ||
      formData.address.postal === "" ||
      formData.address.city === "" ||
      formData.address.province === ""
    ) {
      return "All fields are required";
    }

    const postalRegex = /^[0-9]{5}$/;
    if (!postalRegex.test(formData.address.postal)) {
      return "Postal code must be 5 digits";
    }

    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(formData.address.number)) {
      return "Street number must be a valid number";
    }

    const cifRegex = /^[0-9]{8}$/;
    if (!cifRegex.test(formData.cif)) {
      return "CIF must be 8 digits";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    let token = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating client");
      }

      setModalMessage("Client successfully created!");
      setShowModal(true);
    } catch (err) {
      setError(err.message || "Error creating client");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        {error && <div className="text-red-500 font-medium">{error}</div>}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Client Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter client name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="cif"
            className="block text-sm font-medium text-gray-700"
          >
            CIF
          </label>
          <input
            type="text"
            id="cif"
            name="cif"
            value={formData.cif}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter CIF"
            required
          />
        </div>

        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address.street}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter street name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Street Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.address.number}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter street number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="postal"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postal"
            name="postal"
            value={formData.address.postal}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter postal code"
            required
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter city"
            required
          />
        </div>

        <div>
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.address.province}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter province"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </>
  );
}
