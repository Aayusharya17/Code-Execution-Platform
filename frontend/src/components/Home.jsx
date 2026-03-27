import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";

const CODE_LINES = [
  { indent: 0, tokens: [{ t: "keyword", v: "async function" }, { t: "fn", v: " executeCode" }, { t: "plain", v: "(" }, { t: "param", v: "lang, source" }, { t: "plain", v: ") {" }] },
  { indent: 1, tokens: [{ t: "keyword", v: "const" }, { t: "plain", v: " result = " }, { t: "keyword", v: "await" }, { t: "fn", v: " sandbox" }, { t: "plain", v: ".run({ lang, source });" }] },
  { indent: 1, tokens: [{ t: "keyword", v: "return" }, { t: "plain", v: " { " }, { t: "prop", v: "output" }, { t: "plain", v: ": result." }, { t: "prop", v: "stdout" }, { t: "plain", v: ", " },] },
  { indent: 0, tokens: [{ t: "prop", v: `                     ok` }, { t: "plain", v: ": result." }, { t: "prop", v: "exitCode" }, { t: "plain", v: " === " }, { t: "number", v: "0" }, { t: "plain", v: " };" }] },
  { indent: 0, tokens: [{ t: "plain", v: "}" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "comment", v: "// Run your first snippet " }] },
  { indent: 0, tokens: [{ t: "keyword", v: "const" }, { t: "plain", v: " { output } = " }, { t: "keyword", v: "await" }, { t: "fn", v: " executeCode" }, { t: "plain", v: "(" }, { t: "string", v: '"python"' }, { t: "plain", v: ", " }]}, 
  { indent: 0, tokens: [{ t: "string", v: '"print(\'Hello, world!\')"' }, { t: "plain", v: ");" }] },
  { indent: 0, tokens: [{ t: "fn", v: "console" }, { t: "plain", v: "." }, { t: "fn", v: "log" }, { t: "plain", v: "(output);" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "comment", v: "// → Hello, world!" }] },
];

const TOKEN_COLORS = {
  keyword: "#569cd6",
  fn:      "#dcdcaa",
  param:   "#9cdcfe",
  prop:    "#9cdcfe",
  string:  "#ce9178",
  number:  "#b5cea8",
  comment: "#6a9955",
  plain:   "#d4d4d4",
};

const INDENT_PX = [0, 18, 36];

const FEATURES = [
  { icon: "", title: "Instant Execution", desc: "Sub-second cold starts. Run code before you finish thinking." },
  { icon: "", title: "Secure Sandboxing", desc: "Every run is isolated in its own Docker container. Safe by default." },
  { icon: "", title: "10+ Languages", desc: "Python, JS, Rust, Go, C++, Java — all ready, no installs needed." },
];

const LANGS = ["Python", "JavaScript", "TypeScript", "Rust", "Go", "C++", "Java", "Bash"];

function CodeLine({ line, visible }) {
  return (
    <div
      className="font-mono text-[12px] sm:text-[13px] leading-[20px] sm:leading-[22px] whitespace-nowrap transition-all duration-300"
      style={{
        paddingLeft: INDENT_PX[line.indent] || 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-10px)",
      }}
    >
      {line.tokens.length === 0
        ? "\u00A0"
        : line.tokens.map((tok, i) => (
            <span key={i} style={{ color: TOKEN_COLORS[tok.t] }}>{tok.v}</span>
          ))}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([]);
  const [cursorOn, setCursorOn] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    CODE_LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(v => [...v, i]), 200 + i * 150);
    });
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-[#e6edf3] font-mono flex flex-col overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none z-0 hidden sm:block">
        <div className="absolute top-0 left-1/4 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #007acc 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4ec9b0 0%, transparent 65%)" }} />
      </div>

      <nav className="relative z-20 border-b border-[#21262d]">
        <div className="flex items-center justify-between px-5 sm:px-8 py-4">

          <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="w-20 h-20 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src={Logo} alt="DockCode Logo" className="w-full h-full object-contain" />
        </div>

        {/* Text */}
        <span className="text-3xl sm:text-xl font-bold tracking-tight">
          <span className="text-blue-600">Dock</span>
          <span className="text-orange-500">Code</span>
        </span>
      </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-[13px] text-[#8b949e] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 text-[13px] font-semibold text-white rounded-lg cursor-pointer
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,122,204,0.4)]"
              style={{ background: "linear-gradient(135deg, #007acc, #005f99)" }}
            >
              Get Started
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="sm:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#8b949e] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#8b949e] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#8b949e] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-[#21262d] bg-[#161b22] px-5 py-4 flex flex-col gap-3">
            <button
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="w-full py-2.5 text-[14px] text-[#8b949e] border border-[#30363d] rounded-lg hover:text-white hover:border-[#58a6ff] transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => { navigate("/signup"); setMenuOpen(false); }}
              className="w-full py-2.5 text-[14px] font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #007acc, #005f99)" }}
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-5 sm:px-10 lg:px-20 py-14 sm:py-20">

        <div className={`w-full lg:flex-1 lg:max-w-xl text-center lg:text-left transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-[10px] sm:text-[11px] tracking-widest uppercase
                          border border-[rgba(0,122,204,0.35)] bg-[rgba(0,122,204,0.08)] text-[#58a6ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] animate-pulse" />
             Free to use
          </div>

          <h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.15] tracking-tight mb-5">
            <span className="text-[#e6edf3]">Write code.</span>
            <br />
            <span className="bg-gradient-to-r from-[#007acc] via-[#58a6ff] to-[#4ec9b0] bg-clip-text text-transparent">
              Run it instantly.
            </span>
            <br />
            <span className="text-[#e6edf3]">Ship faster.</span>
          </h1>

          <p className="text-[#8b949e] text-[13px] sm:text-[15px] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            A cloud execution platform that runs your code in secure isolated containers.
            No setup. No installs. Just open a tab and start shipping.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold text-white
                         cursor-pointer transition-all duration-200
                         hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,122,204,0.45)]"
              style={{ background: "linear-gradient(135deg, #007acc 0%, #005f99 100%)" }}
            >
              <span>▶</span> Start for Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3.5 rounded-xl text-[14px] font-bold text-[#8b949e]
                         border border-[#30363d] cursor-pointer
                         hover:border-[#58a6ff] hover:text-[#58a6ff]
                         transition-all duration-200"
            >
              Sign In →
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
            {LANGS.map(lang => (
              <span
                key={lang}
                className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] text-[#6e7681] border border-[#21262d] bg-[#161b22]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className={`w-full lg:flex-1 lg:max-w-lg transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-xl overflow-hidden border border-[#21262d] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">

            <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-[#161b22] border-b border-[#21262d]">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[11px] sm:text-[12px] text-[#6e7681]">executor.ts</span>
              <span className="ml-auto text-[10px] sm:text-[11px] text-[#4ec9b0] bg-[rgba(78,201,176,0.1)] px-2 py-0.5 rounded">TS</span>
            </div>

            <div className="bg-[#0d1117] p-4 sm:p-5 flex gap-3 sm:gap-4 overflow-x-auto">
             
              <div className="flex flex-col text-[#3d444d] text-[12px] sm:text-[13px] leading-[20px] sm:leading-[22px] select-none font-mono text-right min-w-[18px] flex-shrink-0">
                {CODE_LINES.map((_, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-300 ${visibleLines.includes(i) ? "opacity-100" : "opacity-0"}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="flex-1">
                {CODE_LINES.map((line, i) => (
                  <CodeLine key={i} line={line} visible={visibleLines.includes(i)} />
                ))}
                <span
                  className={`inline-block w-[2px] h-[13px] bg-[#aeafad] align-middle ml-px transition-opacity duration-75 ${cursorOn ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative z-10 px-5 sm:px-10 lg:px-20 pb-16 sm:pb-20 transition-all duration-700 delay-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-xl border border-[#21262d] bg-[#0d1117]
                         hover:border-[#30363d] hover:bg-[#161b22]
                         transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{f.icon}</div>
              <h3 className="text-[14px] sm:text-[15px] font-bold text-[#e6edf3] mb-1.5 sm:mb-2 group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#6e7681] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}