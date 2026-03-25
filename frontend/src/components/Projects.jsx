import { useEffect,useState } from "react";

const Projects = () => {

  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  async function fetchProjects(){
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/projects", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      setProjects(data.data);
      
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
        <h1>Projects Page</h1>
        {projects.length === 0 ? (
            <p>No projects found.</p>
        ) : (
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.name}</li>
                ))}
            </ul>
        )}  
    </div>
  )
}

export default Projects;