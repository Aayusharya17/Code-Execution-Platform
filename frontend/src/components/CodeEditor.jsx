import { useEffect, useState, useRef } from "react";

function CodeEditor({ code, onChange }) {
  const lines = code.split("\n");
  const lineCount = lines.length;
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);

  const syncScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden", background: "#1e1e1e", fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace", fontSize: "13px", lineHeight: "20px" }}>

      <div
        ref={gutterRef}
        style={{ width: "50px", background: "#1e1e1e", color: "#858585", textAlign: "right", padding: "8px 8px 8px 0", userSelect: "none", overflowY: "hidden", flexShrink: 0, borderRight: "none" }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} style={{ height: "20px", paddingRight: "14px" }}>{i + 1}</div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={e => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        style={{ flex: 1, background: "#1e1e1e", color: "#d4d4d4", border: "none", outline: "none", resize: "none", fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit", padding: "8px 0 8px 8px", overflowY: "auto", whiteSpace: "pre", wordBreak: "normal", overflowX: "auto", caretColor: "#fff" }}
      />
    </div>
  );
}

export default CodeEditor;