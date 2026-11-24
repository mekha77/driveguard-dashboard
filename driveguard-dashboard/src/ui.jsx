const P = {
  mail: "M3 6h18v12H3z M3 7l9 6 9-6", lock: "M6 11h12v9H6z M8 11V8a4 4 0 018 0v3",
  warn: "M12 4l9 16H3z M12 10v4 M12 17v.5", info: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 8v5 M12 16h.01",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 5a3 3 0 010 6 M18 14c2 .6 3 2.5 3 6",
  bell: "M6 16v-5a6 6 0 0112 0v5l2 2H4z M10 20a2 2 0 004 0", chart: "M4 20V4 M4 20h16 M8 16v-5 M12 16V8 M16 16v-3",
  sliders: "M4 7h10 M18 7h2 M4 17h2 M10 17h10 M14 5v4 M6 15v4", cal: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14z M20 20l-4-4", out: "M10 4H5v16h5 M15 8l4 4-4 4 M19 12H9",
  phone: "M8 3h8v18H8z M11 18h2", drowsy: "M4 10q8 8 16 0 M8 14l-1 2 M12 15v2 M16 14l1 2", check: "M5 12l4 4 10-10",
  sun: "M12 16a4 4 0 100-8 4 4 0 000 8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5L19 19 M5 19l1.5-1.5 M17.5 6.5L19 5",
  moon: "M20 14a8 8 0 01-10-10 8 8 0 1010 10z", right: "M9 6l6 6-6 6", down: "M6 9l6 6 6-6", trend: "M3 17l6-6 4 4 8-8",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8z M4 21c0-4 3.6-6 8-6s8 2 8 6",
};
export const Icon = ({ n, s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
);
export const Brand = () => (
  <div className="brand">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
    <span>DRIVE<br />GUARD</span>
  </div>
);
export const ThemeToggle = ({ theme, onClick }) => (
  <button className="seg" onClick={onClick} aria-label="Switch theme">
    <span className={theme === "light" ? "on" : ""}><Icon n="sun" s={14} /></span>
    <span className={theme === "dark" ? "on" : ""}><Icon n="moon" s={14} /></span>
  </button>
);
