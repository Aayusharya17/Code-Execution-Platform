import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await API.post("/user/signup", form);
      localStorage.setItem("token", res.data.data.token);
      navigate("/execute");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-10 shadow-2xl">

        {/* Icon */}
        {/* <div className="w-11 h-11 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-7">
          <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div> */}

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Create account</h1>
        <p className="text-sm text-white/40 mb-8">Sign up to start your workspace</p>

        {/* Fields */}
        <div className="flex flex-col gap-5 mb-6">

          {/* Username */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-white/35 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="yourname"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-green-500/60 focus:bg-green-500/[0.06] focus:ring-2 focus:ring-green-500/10 transition-all"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-white/35 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-green-500/60 focus:bg-green-500/[0.06] focus:ring-2 focus:ring-green-500/10 transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Password */}
          <div className="relative">
  <label className="block text-[11px] font-medium uppercase tracking-widest text-white/35 mb-2">
    Password
  </label>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    autoComplete="new-password"
    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-white/20 outline-none focus:border-green-500/60 focus:bg-green-500/[0.06] focus:ring-2 focus:ring-green-500/10 transition-all"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    onKeyDown={handleKeyDown}
  />

        {/* Eye Icon */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-white/40 hover:text-white/70 transition"
        >
          {showPassword ? (
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

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-white/70" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Creating account…
            </>
          ) : (
            "Sign up"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-white/25 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Signup;