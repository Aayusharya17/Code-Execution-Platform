import { useEffect, useState, useRef } from "react";
import axios from "axios";
import IconFile from "./IconFile";
import CodeEditor from "./CodeEditor";

const IconFiles = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// const IconSearch = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
//     <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//   </svg>
// );


// const IconGit = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
//     <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
//     <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
//     <path d="M6 9v6M9 6h3a3 3 0 013 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//   </svg>
// );


// const IconDebug = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path d="M12 22C7 22 3 17.52 3 12S7 2 12 2s9 4.48 9 10-4 10-9 10z" stroke="currentColor" strokeWidth="1.5"/>
//     <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//   </svg>
// );


// const IconExtensions = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <rect x="2" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
//     <rect x="13" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
//     <rect x="2" y="13" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
//     <rect x="13" y="13" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
//   </svg>
// );


const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconChevronRight = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconFolder = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <path d={open ? "M1 4h12v8H1z" : "M1 3h5l1 1h6v8H1z"} fill={open ? "#DCAD6F" : "#DCAD6F"} fillOpacity="0.3" stroke="#DCAD6F" strokeWidth="0.8"/>
  </svg>
);
const IconTerminal = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polyline points="2,4 6,7 2,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="7" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconOutput = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 5l2 2-2 2M7 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
  </svg>
);
const IconSave = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2h8l2 2v8H2V2z" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="4" y="8" width="6" height="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8"/>
    <rect x="4" y="2" width="5" height="3" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

function getExt(filename) {
  return filename?.split(".").pop()?.toLowerCase() || "";
}

function getLanguage(filename) {
  const ext = getExt(filename);
  const map = { js: "JavaScript", jsx: "JavaScript React", ts: "TypeScript", tsx: "TypeScript React", py: "Python", css: "CSS", html: "HTML", json: "JSON", md: "Markdown" };
  return map[ext] || "Plain Text";
}

export default function Execute() {
  const [projects, setProjects] = useState([]);

  const [filesMap, setFilesMap] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [openProjects, setOpenProjects] = useState({});
  const [activeTab, setActiveTab] = useState("TERMINAL");
  const [openTabs, setOpenTabs] = useState([]);
  const [activeActivityBar, setActiveActivityBar] = useState("files");
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [panelHeight, setPanelHeight] = useState(200);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingPanel, setIsResizingPanel] = useState(false);
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorCol, setCursorCol] = useState(1);
  const [saved, setSaved] = useState(true);

  const [inlineInput, setInlineInput] = useState(null);
  const [inlineValue, setInlineValue] = useState("");
  const inlineRef = useRef(null);
  const [newProjectInput, setNewProjectInput] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const newProjectRef = useRef(null);

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/v1";

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/user/projects`, { headers: { Authorization: `Bearer ${token}` } });
      setProjects(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchFiles = async (projectId) => {
    try {
      const res = await axios.get(`${API}/projects/${projectId}/files`, { headers: { Authorization: `Bearer ${token}` } });
      setFilesMap(prev => ({ ...prev, [projectId]: res.data.data }));
    } catch (err) { console.error(err); }
  };

  const openFile = async (fileId, fileName) => {
    try {
      const res = await axios.get(`${API}/files/${fileId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedFile(fileId);
      setSelectedFileName(fileName);
      setCode(res.data.data.content);
      setSaved(true);
      setOpenTabs(prev => prev.find(t => t.id === fileId) ? prev : [...prev, { id: fileId, name: fileName }]);
    } catch (err) { console.error(err); }
  };

  const closeTab = (e, tabId) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t.id !== tabId);
    setOpenTabs(next);
    if (selectedFile === tabId) {
      if (next.length > 0) openFile(next[next.length - 1].id, next[next.length - 1].name);
      else { setSelectedFile(null); setSelectedFileName(null); setCode(""); }
    }
  };

  const saveFile = async () => {
    try {
      await axios.put(`${API}/files/${selectedFile}`, { content: code }, { headers: { Authorization: `Bearer ${token}` } });
      setSaved(true);
    } catch (err) { console.error(err); }
  };

  const runCode = async () => {
    setOutput("Running...");
    console.log(input);
    setActiveTab("OUTPUT");
    try {
      const res = await axios.post(`${API}/execute/${selectedFile}`, { input }, { headers: { Authorization: `Bearer ${token}` } });
      console.log(res);
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.response?.data?.message || "Execution error");
    }
  };

  const startInlineCreate = (e, projectId, type) => {
    e.stopPropagation();
    setOpenProjects(prev => ({ ...prev, [projectId]: true }));
    setSelectedProject(projectId);
    if (!filesMap[projectId]) fetchFiles(projectId);
    setInlineInput({ projectId, type });
    setInlineValue("");
    setTimeout(() => inlineRef.current?.focus(), 50);
  };

    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const createProject = async () => {
  if (!newProjectName.trim()) { setNewProjectInput(false); return; }
  try {
    await axios.post(`${API}/user/projects`, { name: newProjectName.trim() }, { headers: { Authorization: `Bearer ${token}` } });
    setNewProjectName("");
    setNewProjectInput(false);
    fetchProjects();
  } catch (err) { console.error(err); }
};

  const commitInlineCreate = async () => {
    if (!inlineInput || !inlineValue.trim()) { setInlineInput(null); return; }
    const { projectId, type } = inlineInput;
    const name = inlineValue.trim();
    setInlineInput(null);
    setInlineValue("");
    try {
      if (type === "file") {
        await axios.post(`${API}/files/${projectId}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API}/folders/${projectId}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
      }
      fetchFiles(projectId);
    } catch (err) { console.error(err); }
  };
  
  useEffect(() => {
    const onMouseMove = (e) => {
      if (isResizingSidebar) setSidebarWidth(Math.max(160, Math.min(480, e.clientX - 48)));
      if (isResizingPanel) {
        const h = window.innerHeight - e.clientY;
        setPanelHeight(Math.max(80, Math.min(500, h)));
      }
    };
    const onMouseUp = () => { setIsResizingSidebar(false); setIsResizingPanel(false); };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
  }, [isResizingSidebar, isResizingPanel]);

  useEffect(() => { fetchProjects(); }, []);

  const handleCodeChange = (val) => { setCode(val); setSaved(false); };

  const handleCursorMove = (e) => {
    const ta = e.target;
    const text = ta.value.substring(0, ta.selectionStart);
    const lines = text.split("\n");
    setCursorLine(lines.length);
    setCursorCol(lines[lines.length - 1].length + 1);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#1e1e1e", color: "#cccccc", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: "13px", overflow: "hidden", flexDirection: "column" }}>


      <div style={{ height: "30px", background: "#323233", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", userSelect: "none" }}>
        <div style={{ position: "absolute", left: "12px", display: "flex", gap: "6px", alignItems: "center" }}>
          {[
            "File", 
          // "Edit", "Selection", "View", "Go", "Run", "Terminal", 
          // "Help"
        ].map(m => (
            <span key={m} style={{ padding: "2px 8px", fontSize: "12px", cursor: "pointer", borderRadius: "3px" }}
              onMouseEnter={e => e.target.style.background = "#505050"}
              onMouseLeave={e => e.target.style.background = "transparent"}>{m}</span>
          ))}
        </div>
        <span style={{ fontSize: "12px", color: "#cccccc", opacity: 0.8 }}>
          {selectedFileName ? `${selectedFileName} — Code Editor` : "Code Editor"}
        </span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <div style={{ width: "48px", background: "#333333", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "8px", gap: "4px", flexShrink: 0 }}>
          {[
            { id: "files", icon: <IconFiles /> },
            // { id: "search", icon: <IconSearch /> },
            // { id: "git", icon: <IconGit /> },
            // { id: "debug", icon: <IconDebug /> },
            // { id: "extensions", icon: <IconExtensions /> },
          ].map(({ id, icon }) => (
            <button key={id} onClick={() => setActiveActivityBar(id)}
              style={{ width: "48px", height: "48px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: activeActivityBar === id ? "#ffffff" : "#858585", position: "relative", outline: "none" }}>
              {activeActivityBar === id && <div style={{ position: "absolute", left: 0, top: "10px", bottom: "10px", width: "2px", background: "#007acc" }} />}
              {icon}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#25169b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, marginBottom: "8px", cursor: "pointer" }}>
                <div
      className="fixed bottom-4 left-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* U Icon */}
      <div className="w-[28px] h-[28px] relative bottom-[-8px] left-[-6px] rounded-full bg-[#25169b] flex items-center justify-center text-white font-semibold cursor-pointer shadow-lg hover:bg-indigo-500 transition">
        U
      </div>
      {/* Dropdown */}
      <div
        className={`absolute bottom-2 left-5 w-40 bg-[#111] border border-white/10 rounded-xl shadow-xl p-2 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>
    </div>

          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: `${sidebarWidth}px`, background: "#252526", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden", borderRight: "1px solid #191919" }}>
          <div style={{ padding: "10px 12px 6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.8px", color: "#bbbbbb", textTransform: "uppercase", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <span>Explorer</span>
  <button
    title="New Project"
    onClick={() => {
      setNewProjectInput(true);
      setNewProjectName("");
      setTimeout(() => newProjectRef.current?.focus(), 50);
    }}
    style={{ background: "none", border: "none", cursor: "pointer", color: "#cccccc", padding: "2px 4px", display: "flex", alignItems: "center", borderRadius: "3px" }}
    onMouseEnter={e => { e.currentTarget.style.background = "#3c3c3c"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#cccccc"; }}
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 3h4l1 1h7v8H1V3z" stroke="currentColor" strokeWidth="1"/>
      <line x1="7" y1="6.5" x2="7" y2="10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5" y1="8.5" x2="9" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  </button>
</div>

{newProjectInput && (
  <div style={{ display: "flex", alignItems: "center", padding: "4px 8px", gap: "6px", borderBottom: "1px solid #3c3c3c" }}>
    <IconFolder open={false} />
    <input
      ref={newProjectRef}
      value={newProjectName}
      onChange={e => setNewProjectName(e.target.value)}
      onKeyDown={e => {
  if (e.key === "Enter") {
    e.preventDefault();
    setNewProjectInput(false); 
    if (newProjectName.trim()) {
      axios.post(`${API}/projects/create`, { name: newProjectName.trim() }, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => { setNewProjectName(""); fetchProjects(); })
        .catch(err => console.error(err));
    } else {
      setNewProjectName("");
    }
  }
  if (e.key === "Escape") {
    setNewProjectInput(false);
    setNewProjectName("");
  }
}}
      
  onBlur={() => { setNewProjectInput(false); setNewProjectName(""); }}
      placeholder="project name"
      style={{ flex: 1, background: "#3c3c3c", border: "1px solid #007acc", borderRadius: "3px", color: "#fff", padding: "2px 6px", fontSize: "12px", fontFamily: "inherit", outline: "none" }}
    />
  </div>
)}

          <div style={{ flex: 1, overflowY: "auto" }}>
            {projects.map((p) => {
              const projectFiles = filesMap[p._id] || [];
              const isOpen = openProjects[p._id];
              return (
                <div key={p._id}>

                  <div
                    style={{ display: "flex", alignItems: "center", padding: "3px 4px 3px 8px", cursor: "pointer", gap: "4px", userSelect: "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2a2d2e"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    onClick={() => {
                      setOpenProjects(prev => ({ ...prev, [p._id]: !isOpen }));
                      if (!isOpen) { setSelectedProject(p._id); fetchFiles(p._id); }
                    }}
                  >
                    <IconChevronRight open={isOpen} />
                    <IconFolder open={isOpen} />
                    <span style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#cccccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>

                    <button
                      title="New File"
                      onClick={(e) => startInlineCreate(e, p._id, "file")}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#cccccc", padding: "2px 4px", display: "flex", alignItems: "center", borderRadius: "3px", flexShrink: 0 }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#3c3c3c"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#cccccc"; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 1h7l3 3v9H2V1z" stroke="currentColor" strokeWidth="1"/>
                        <path d="M9 1v3h3" stroke="currentColor" strokeWidth="1"/>
                        <line x1="5" y1="8" x2="9" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                        <line x1="7" y1="6" x2="7" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                    </button>

                  </div>

                  {isOpen && (
                    <>
                      {projectFiles.map((f) => (
                        <div
                          key={f._id}
                          style={{ display: "flex", alignItems: "center", padding: "3px 12px 3px 28px", cursor: "pointer", gap: "6px", background: selectedFile === f._id ? "#094771" : "transparent" }}
                          onMouseEnter={e => { if (selectedFile !== f._id) e.currentTarget.style.background = "#2a2d2e"; }}
                          onMouseLeave={e => { if (selectedFile !== f._id) e.currentTarget.style.background = "transparent"; }}
                          onClick={() => openFile(f._id, f.name)}
                        >
                          <IconFile ext={getExt(f.name)} />
                          <span style={{ color: selectedFile === f._id ? "#ffffff" : "#cccccc" }}>{f.name}</span>
                        </div>
                      ))}

                      {inlineInput && inlineInput.projectId === p._id && (
                        <div style={{ display: "flex", alignItems: "center", padding: "3px 8px 3px 28px", gap: "6px" }}>
                          {inlineInput.type === "file"
                            ? <IconFile ext={getExt(inlineValue)} />
                            : <IconFolder open={false} />
                          }
                          <input
                            ref={inlineRef}
                            value={inlineValue}
                            onChange={e => setInlineValue(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter") commitInlineCreate();
                              if (e.key === "Escape") setInlineInput(null);
                            }}
                            onBlur={commitInlineCreate}
                            placeholder={inlineInput.type === "file" ? "filename.ext" : "folder name"}
                            style={{ flex: 1, background: "#3c3c3c", border: "1px solid #007acc", borderRadius: "3px", color: "#fff", padding: "2px 6px", fontSize: "12px", fontFamily: "inherit", outline: "none" }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{ width: "4px", cursor: "col-resize", background: "transparent", flexShrink: 0, zIndex: 10 }}
          onMouseDown={() => setIsResizingSidebar(true)}
          onMouseEnter={e => e.currentTarget.style.background = "#007acc"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          <div style={{ height: "35px", background: "#252526", display: "flex", alignItems: "stretch", overflow: "hidden", flexShrink: 0, borderBottom: "1px solid #191919" }}>
            {openTabs.map(tab => (
              <div
                key={tab.id}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", cursor: "pointer", borderRight: "1px solid #191919", background: selectedFile === tab.id ? "#1e1e1e" : "#2d2d2d", color: selectedFile === tab.id ? "#ffffff" : "#969696", borderTop: selectedFile === tab.id ? "1px solid #007acc" : "1px solid transparent", fontSize: "13px", userSelect: "none", position: "relative" }}
                onClick={() => openFile(tab.id, tab.name)}
              >
                <IconFile ext={getExt(tab.name)} />
                <span>{tab.name}{!saved && selectedFile === tab.id ? " ●" : ""}</span>
                <span
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "3px", color: "#969696" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#464646"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#969696"; }}
                  onClick={(e) => closeTab(e, tab.id)}
                >
                  <IconClose />
                </span>
              </div>
            ))}
          </div>

          {code !== undefined && (
            <div style={{ flex: 1, overflow: "hidden", display: "flex" }}
              onClick={handleCursorMove}
              onKeyUp={handleCursorMove}
            >
              {selectedFile ? (
                <CodeEditor code={code} onChange={handleCodeChange} />
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#858585", gap: "12px" }}>
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" opacity="0.15">
                    <path d="M30 20h30l20 20v50H20V20h10" stroke="#fff" strokeWidth="3"/>
                    <path d="M60 20v20h20" stroke="#fff" strokeWidth="3"/>
                  </svg>
                  <div style={{ fontSize: "18px", fontWeight: 300, color: "#555" }}>Open a file to start editing</div>
                  <div style={{ fontSize: "12px", color: "#444" }}>Select a file from the explorer</div>
                </div>
              )}
            </div>
          )}

          <div
            style={{ height: "4px", cursor: "row-resize", background: "transparent", flexShrink: 0 }}
            onMouseDown={() => setIsResizingPanel(true)}
            onMouseEnter={e => e.currentTarget.style.background = "#007acc"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          />

          <div style={{ height: `${panelHeight}px`, background: "#1e1e1e", display: "flex", flexDirection: "column", flexShrink: 0, borderTop: "1px solid #252526" }}>
            
            <div style={{ display: "flex", alignItems: "center", background: "#252526", height: "35px", gap: "0", borderBottom: "1px solid #191919", padding: "0 8px" }}>
              {[
                { id: "PROBLEMS", label: "Problems" },
                { id: "OUTPUT", label: "Output", icon: <IconOutput /> },
                { id: "TERMINAL", label: "Input", icon: <IconTerminal /> },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 12px", height: "35px", background: "none", border: "none", cursor: "pointer", color: activeTab === tab.id ? "#ffffff" : "#969696", fontSize: "12px", borderBottom: activeTab === tab.id ? "1px solid #ffffff" : "1px solid transparent", outline: "none" }}>
                  {tab.icon}{tab.label}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <button onClick={saveFile}
                  style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", background: "none", border: "1px solid #3c3c3c", borderRadius: "3px", color: "#cccccc", cursor: "pointer", fontSize: "12px" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#2a2d2e"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                  title="Save (Ctrl+S)">
                  <IconSave /> Save
                </button>
                <button onClick={runCode}
                  style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", background: "#388a34", border: "1px solid #388a34", borderRadius: "3px", color: "#ffffff", cursor: "pointer", fontSize: "12px" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#4caf50"}
                  onMouseLeave={e => e.currentTarget.style.background = "#388a34"}
                  title="Run Code">
                  <IconPlay /> Run
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {activeTab === "TERMINAL" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 12px", gap: "6px" }}>
                  <div style={{ fontSize: "11px", color: "#858585", marginBottom: "2px" }}>stdin (input)</div>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Provide input for your program..."
                    style={{ flex: 1, background: "#0d0d0d", color: "#cccccc", border: "1px solid #3c3c3c", borderRadius: "3px", padding: "6px 8px", fontFamily: "'Cascadia Code', 'Consolas', monospace", fontSize: "12px", resize: "none", outline: "none", lineHeight: "1.5" }}
                  />
                </div>
              )}
              {activeTab === "OUTPUT" && (
                <div style={{ flex: 1, overflow: "auto", padding: "8px 12px", fontFamily: "'Cascadia Code', 'Consolas', monospace", fontSize: "12px", lineHeight: "1.6" }}>
                  {output ? (
                    <pre style={{ color: output.toLowerCase().includes("error") ? "#f48771" : "#cccccc", margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
                  ) : (
                    <span style={{ color: "#555" }}>No output yet. Run your code to see results.</span>
                  )}
                </div>
              )}
              {activeTab === "PROBLEMS" && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "12px" }}>
                  No problems detected in workspace.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ height: "22px", background: "#007acc", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0, fontSize: "11px", color: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6a5 5 0 1010 0A5 5 0 001 6z" stroke="currentColor" strokeWidth="1"/><path d="M6 4v2l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            main
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1"/><path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            0  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1"/><path d="M4 6h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            0
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {selectedFileName && <>
            <span>Ln {cursorLine}, Col {cursorCol}</span>
            <span>UTF-8</span>
            <span>{getLanguage(selectedFileName)}</span>
            <span style={{ color: saved ? "#4fc1ff" : "#f9c74f" }}>{saved ? "✓ Saved" : "● Unsaved"}</span>
          </>}
          <span>Spaces: 2</span>
        </div>
      </div> */}
    </div>
  );
}