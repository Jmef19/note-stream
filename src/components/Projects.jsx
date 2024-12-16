import { FaPlusSquare } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { HiTrash } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectDetails from "./ProjectDetails";
import ProjectEdit from "./ProjectEdit";
import { useRouter } from "next/navigation";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    details: false,
    edit: false,
    add: false,
  });

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
    fetchProjects();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/project",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error loading projects");

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/project/${projectId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete project");

      fetchProjects();
    } catch (error) {
      console.error(error.message || "Failed to delete project");
    }
  };

  const openModal = (type, projectId = null) => {
    setSelectedProjectId(projectId);
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    if (type === "edit") fetchProjects();
  };

  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-col w-2/3">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            className="h-8 ml-4 flex items-center justify-center"
            onClick={fetchProjects}
          >
            <IoReload className="h-8 w-8" />
          </button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg p-3">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project._id} className="flex items-center space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => openModal("details", project._id)}
                  >
                    {project.name}
                  </button>
                  <button
                    className="text-teal-500"
                    onClick={() => openModal("edit", project._id)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteProject(project._id)}
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
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <FaPlusSquare
          className="h-16 w-auto cursor-pointer"
          onClick={() => openModal("add")}
        />
      </div>

      {modalState.details && selectedProjectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ProjectDetails
            projectId={selectedProjectId}
            onClose={() => closeModal("details")}
          />
        </div>
      )}

      {modalState.edit && selectedProjectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ProjectEdit
            projectId={selectedProjectId}
            onClose={() => closeModal("edit")}
          />
        </div>
      )}

      {modalState.add && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ProjectForm onClose={() => closeModal("add")} />
        </div>
      )}
    </div>
  );
}

export default Projects;
