import { useState, useEffect } from "react";

function ProjectDetails({ projectId, onClose }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/project/one/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error loading project details");
        }

        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching project details");
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project || !project.address) {
    return <div>No project details available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Details</h2>
        <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
          &#x2715;
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-500">
          Project Code: {project.projectCode}
        </p>
        <p className="text-sm text-gray-500">Client ID: {project.clientId}</p>

        <div className="mt-4">
          <h4 className="font-semibold">Address</h4>
          <p>
            {project.address.street} {project.address.number}
          </p>
          <p>
            {project.address.city}, {project.address.province}{" "}
            {project.address.postal}
          </p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Additional Details</h4>
          <p>Internal Code: {project.code}</p>
          <p>Email: {project.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
