import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const res = await API.get("/user/projects");
    console.log(res);
    setProjects(res.data.data);
  };

  const createProject = async () => {
    await API.post("/projects/create", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-[#1e1e1e] text-white h-screen">
      <h1 className="text-2xl mb-4">My Projects</h1>

      <div className="mb-4">
        <input
          className="p-2 bg-gray-800 mr-2"
          placeholder="New project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createProject}
          className="bg-blue-500 px-3 py-1"
        >
          Create
        </button>
      </div>

      {projects.map((p) => (
        <div
          key={p._id}
          className="p-2 bg-gray-800 mb-2 cursor-pointer"
          onClick={() => navigate("/execute")}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}

export default Projects;