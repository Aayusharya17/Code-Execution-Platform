import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-white flex flex-col">

      <div className="flex justify-between items-center px-8 py-4 bg-[#252526] shadow-md">
        <h1 className="text-xl font-bold text-blue-400">
          CodeRunner
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 border border-gray-500 rounded hover:bg-gray-700 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1 bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-10">

        <div className="max-w-2xl text-center">

          <h2 className="text-4xl font-bold mb-4">
            Run Code Instantly in the Cloud 
          </h2>

          <p className="text-gray-400 mb-6">
            A powerful online code execution platform built with modern DevOps tools.
            Write, edit, and run code in multiple languages directly from your browser —
            just like VS Code, but in the cloud.
          </p>

          <p className="text-gray-500 mb-8">
            Supports Python, JavaScript, C++, Java and more with secure Docker-based execution,
            real-time output, and project-based file management.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 px-6 py-3 rounded text-lg hover:bg-green-600 transition cursor-pointer"
          >
            Get Started 
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;