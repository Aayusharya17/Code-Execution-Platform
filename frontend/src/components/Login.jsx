import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/user/login", form);

      localStorage.setItem("token", res.data.data.token);

      navigate("/myProjects");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1e1e] text-white">
      <h2 className="text-2xl mb-4">Login</h2>

      <input
        className="mb-2 p-2 bg-gray-800"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="mb-4 p-2 bg-gray-800"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Login;