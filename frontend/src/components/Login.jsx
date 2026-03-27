import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if(!form.email || !form.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      if(!validateEmail(form.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.data.token);
      navigate("/execute");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-10 shadow-2xl">

        {/* Icon
        <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-7">
          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div> */}

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h1>
        <p className="text-sm text-white/40 mb-2">Sign in to continue to your workspace</p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Fields */}
        <div className="flex flex-col gap-5 mb-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-white/35 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="relative">
            <label className="block text-[11px] font-medium uppercase tracking-widest text-white/35 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={handleKeyDown}
            />
            <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-white/40 hover:text-white/70 transition cursor-pointer"
        >
          {!showPassword ? (
            // Eye OFF (hide)
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.94 10.94 0 0112 19C7 19 2.73 15.11 1 12c.74-1.32 1.82-2.73 3.17-3.96M9.9 4.24A10.94 10.94 0 0112 5c5 0 9.27 3.89 11 7-.5.88-1.2 1.8-2.06 2.67M1 1l22 22" />
            </svg>
          ) : (
            // Eye ON (show)
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-white/70" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-white/25 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;