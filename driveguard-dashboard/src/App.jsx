import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Overview from "./Overview.jsx";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [authed, setAuthed] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return authed
    ? <Overview theme={theme} onToggleTheme={toggle} onLogout={() => setAuthed(false)} />
    : <Login theme={theme} onToggleTheme={toggle} onSuccess={() => setAuthed(true)} />;
}
