const IconFile = ({ ext }) => {
  const colors = { js: "#CBCB41", jsx: "#61DAFB", ts: "#3178C6", tsx: "#61DAFB", py: "#3572A5", css: "#563D7C", html: "#E34C26", json: "#CBCB41", md: "#519ABA" };
  const color = colors[ext] || "#CCC";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 1h7l3 3v9H2V1z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.8"/>
      <path d="M9 1v3h3" stroke={color} strokeWidth="0.8"/>
    </svg>
  );
};

export default IconFile;