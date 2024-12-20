import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function ProjectEdit({ projectId, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    projectCode: "",
    email: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    code: "",
    clientId: "",
  });

  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        return;
      }

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
          throw new Error("Error fetching clients");
        }

        const data = await response.json();
        setClients(data);
      } catch (err) {
        console.error(err.message || "Error loading clients");
      }
    };

    fetchClients();
  }, []);

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
      !formData.name ||
      !formData.projectCode ||
      !formData.email ||
      !formData.address.street ||
      !formData.address.number ||
      !formData.address.postal ||
      !formData.address.city ||
      !formData.address.province ||
      !formData.code ||
      !formData.clientId
    ) {
      return "All fields are required.";
    }

    const postalRegex = /^[0-9]{5}$/;
    if (!postalRegex.test(formData.address.postal)) {
      return "Postal code must be 5 digits.";
    }

    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(formData.address.number)) {
      return "Street number must be a valid number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Invalid email format.";
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
        `https://bildy-rpmaya.koyeb.app/api/project/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error editing project");
      }

      setModalMessage("Project successfully edited!");
      setShowModal(true);
    } catch (err) {
      setError(err.message || "Error editing project");
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
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6 flex-grow relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &#x2715;
        </button>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="projectCode"
              className="block text-sm font-medium text-gray-700"
            >
              Project Code
            </label>
            <input
              type="text"
              id="projectCode"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter project code"
              required
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="clientId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Client
            </label>
            <select
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                -- Select a client --
              </option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {["street", "number", "postal", "city", "province"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData.address[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}

          <div className="col-span-full">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Internal Project Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter internal code"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 transition-transform duration-150"
          >
            Edit
          </button>
        </div>
      </form>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </>
  );
}
