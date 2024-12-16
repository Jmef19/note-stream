import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function DeliveryNotesForm({ onClose }) {
  const [formData, setFormData] = useState({
    clientId: "",
    projectId: "",
    format: "material",
    material: "",
    hours: 0,
    description: "",
    workdate: "",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("jwt");

      try {
        const clientsResponse = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/client",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!clientsResponse.ok) {
          throw new Error("Failed to fetch clients");
        }
        const clientsData = await clientsResponse.json();
        setClients(clientsData);

        const projectsResponse = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/project",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!projectsResponse.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (err) {
        setError(err.message || "Error fetching clients and projects");
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      formData.clientId === "" ||
      formData.projectId === "" ||
      formData.description === "" ||
      formData.workdate === ""
    ) {
      return "All fields are required";
    }

    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!dateRegex.test(formData.workdate)) {
      return "Work date must be in MM/DD/YYYY format";
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
        "https://bildy-rpmaya.koyeb.app/api/deliverynote",
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
        throw new Error(errorData.message || "Error creating delivery note");
      }

      setModalMessage("Delivery note successfully created!");
      setShowModal(true);
    } catch (err) {
      setError(err.message || "Error creating delivery note");
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
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto space-y-6 mt-12"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-1/5 right-2/4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close form"
        >
          &#x2715;
        </button>

        {error && <div className="text-red-500 font-semibold">{error}</div>}

        <div>
          <label
            htmlFor="clientId"
            className="block text-sm font-medium text-gray-700"
          >
            Client
          </label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="projectId"
            className="block text-sm font-medium text-gray-700"
          >
            Project
          </label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="format"
            className="block text-sm font-medium text-gray-700"
          >
            Format
          </label>
          <select
            id="format"
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="material">Material</option>
            <option value="hours">Hours</option>
          </select>
        </div>

        {formData.format === "material" && (
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter material type"
              required
            />
          </div>
        )}

        {formData.format === "hours" && (
          <div>
            <label
              htmlFor="hours"
              className="block text-sm font-medium text-gray-700"
            >
              Hours
            </label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter hours worked"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label
            htmlFor="workdate"
            className="block text-sm font-medium text-gray-700"
          >
            Work Date
          </label>
          <input
            type="text"
            id="workdate"
            name="workdate"
            value={formData.workdate}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="MM/DD/YYYY"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </>
  );
}
