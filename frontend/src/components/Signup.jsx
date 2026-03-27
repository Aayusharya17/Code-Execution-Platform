import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    setError("");
    if (!form.username || !form.email || !form.password) return setError("All fields are required.");
    if (!validateEmail(form.email)) return setError("Please enter a valid email address.");
    setLoading(true);
    try {
      const res = await API.post("/user/signup", form);
      localStorage.setItem("token", res.data.data.token);
      navigate("/execute");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSignup(); };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] font-mono flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #007acc 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4ec9b0 0%, transparent 65%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">

        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl px-7 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">

          <h1 className="text-[22px] font-bold text-white tracking-tight mb-1">Create account</h1>
          <p className="text-[13px] text-[#6e7681] mb-7">Sign up and start running code instantly</p>

          {error && (
            <div className="flex items-center gap-2 bg-[rgba(248,81,73,0.1)] border border-[rgba(248,81,73,0.3)] text-[#f85149] text-[12px] rounded-lg px-4 py-2.5 mb-5">
              <span>⚠</span> {error}
            </div>
          )}
          <div className="flex flex-col gap-5 mb-6">

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#8b949e] mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="yourname"
                autoComplete="username"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-[13px] text-[#e6edf3]
                           placeholder-[#3d444d] outline-none font-mono
                           focus:border-[#007acc] focus:ring-2 focus:ring-[rgba(0,122,204,0.15)]
                           transition-all duration-200"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#8b949e] mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-[13px] text-[#e6edf3]
                           placeholder-[#3d444d] outline-none font-mono
                           focus:border-[#007acc] focus:ring-2 focus:ring-[rgba(0,122,204,0.15)]
                           transition-all duration-200"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#8b949e] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 pr-11 text-[13px] text-[#e6edf3]
                             placeholder-[#3d444d] outline-none font-mono
                             focus:border-[#007acc] focus:ring-2 focus:ring-[rgba(0,122,204,0.15)]
                             transition-all duration-200"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7681] hover:text-[#8b949e] transition-colors duration-200 cursor-pointer"
                >
                  {!showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.94 10.94 0 0112 19C7 19 2.73 15.11 1 12c.74-1.32 1.82-2.73 3.17-3.96M9.9 4.24A10.94 10.94 0 0112 5c5 0 9.27 3.89 11 7-.5.88-1.2 1.8-2.06 2.67M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-xl text-[13px] font-bold text-white
                       flex items-center justify-center gap-2 cursor-pointer
                       transition-all duration-200
                       hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,122,204,0.4)]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            style={{ background: "linear-gradient(135deg, #007acc 0%, #005f99 100%)" }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Creating account…
              </>
            ) : (
              <><span>▶</span> Create Account</>
            )}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#21262d]" />
            <span className="text-[11px] text-[#3d444d]">or</span>
            <div className="flex-1 h-px bg-[#21262d]" />
          </div>

          <p className="text-center text-[12px] text-[#6e7681]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#58a6ff] hover:text-[#79c0ff] font-semibold cursor-pointer transition-colors duration-200"
            >
              Sign in →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;