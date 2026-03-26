import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1e1e] text-white">
      <h1 className="text-4xl mb-6">Code Execution Platform</h1>

      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-500 px-4 py-2 rounded">Login</button>
        </Link>

        <Link to="/signup">
          <button className="bg-500 px-4 py-2 rounded">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;