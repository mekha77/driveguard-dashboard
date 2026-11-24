import { useState, useEffect } from "react";
import { Brand, Icon, ThemeToggle } from "./ui.jsx";

// Placeholder data — replace with backend responses. Add #empty or #loading to the URL to preview those states.
const STATS = [
  ["Trips today", 128, "+14 vs last Tuesday", ""], ["Average risk · Low", 34, "Down 3 vs last week", "ok"],
  ["Alerts today", 47, "Up 9 vs yesterday", "bad"], ["Drivers on the road", 52, "of 60 on shift today", ""],
];
const TREND = [38, 44, 41, 52, 61, 57, 67, 74];
const WEEKS = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13", "Oct 20"];
const DRIVERS = [["Omar Khaled", 41, 19, 82, "High"], ["Youssef Ali", 37, 14, 74, "High"], ["Sara Mahmoud", 29, 9, 61, "Medium"], ["Karim Nabil", 33, 8, 58, "Medium"]];
const ALERTS = [["20 Oct, 08:57", "Omar Khaled", "Drowsiness", "drowsy", "High"], ["20 Oct, 08:51", "Sara Mahmoud", "Phone use", "phone", "Medium"]];
const NOTES = [
  ["drowsy", "Drowsiness · Omar Khaled", "Nasr City → New Cairo. Driver alerted in the car.", "2 min", true],
  ["phone", "Phone use · Youssef Ali", "Ring Road. Phone in hand for 6 s while moving.", "6 min", true],
  ["trend", "Risk score up · Omar Khaled", "Weekly score rose from 61 to 82 (High).", "1 h", true],
  ["check", "Trip ended · Sara Mahmoud", "25 min trip with 1 warning. Summary uploaded.", "2 h", false],
  ["phone", "Karim Nabil’s phone is offline", "No signal for 10 min during an active trip.", "3 h", false],
  ["user", "Mostafa Kamal joined", "Accepted the invite and finished setup.", "Yesterday", false],
];
const NAV = [["grid", "Overview"], ["users", "Drivers"], ["bell", "Alerts"], ["chart", "Reports"], ["sliders", "Settings"]];

const Sev = ({ level, score }) => (
  <span className={`sev ${level.toLowerCase()}`}>{score ? `${score} · ` : ""}{level}<Icon n={level === "High" ? "info" : "warn"} s={12} /></span>
);

function Chart() {
  const L = 36, R = 570, T = 14, B = 190;
  const x = (i) => L + (i / (TREND.length - 1)) * (R - L), y = (v) => B - (v / 100) * (B - T);
  const last = TREND.length - 1;
  return (
    <svg viewBox="0 0 600 225" className="chart" role="img" aria-label="Fleet risk trend, last 8 weeks">
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}><line x1={L} x2={R} y1={y(g)} y2={y(g)} stroke="var(--line)" /><text x={L - 8} y={y(g) + 4} textAnchor="end" fill="var(--muted)" fontSize="11">{g}</text></g>
      ))}
      <line x1={L} x2={R} y1={y(70)} y2={y(70)} stroke="var(--high)" strokeDasharray="4 4" />
      <text x={L + 6} y={y(70) - 5} fill="var(--high)" fontSize="11">High risk ≥ 70</text>
      <polyline points={TREND.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="var(--text)" strokeWidth="2" />
      {TREND.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="var(--text)" />)}
      <text x={x(last)} y={y(TREND[last]) - 10} textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">{TREND[last]}</text>
      {WEEKS.map((w, i) => <text key={w} x={x(i)} y="214" textAnchor="middle" fill="var(--muted)" fontSize="11">{w}</text>)}
    </svg>
  );
}

export default function Overview({ theme, onToggleTheme, onLogout }) {
  const mode = window.location.hash.slice(1);
  const [loading, setLoading] = useState(true);
  const [bell, setBell] = useState(false);
  const [toast, setToast] = useState(false);
  useEffect(() => {
    if (mode === "loading") return;
    const t = setTimeout(() => setLoading(false), 900);
    const t2 = setTimeout(() => setToast(true), 3500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [mode]);
  const empty = mode === "empty" || DRIVERS.length === 0;

  return (
    <div className="shell">
      <aside className="side">
        <Brand />
        <nav>{NAV.map(([ic, n], i) => (
          <a key={n} href="#" className={i === 0 ? "on" : ""}><Icon n={ic} />{n}{n === "Settings" && <Icon n="down" s={14} />}</a>
        ))}</nav>
        <div className="user"><span className="avatar">MA</span><div><b>Mona Adel</b><small>Fleet manager · Nile Fleet</small></div>
          <button className="icon-btn flat" onClick={onLogout} aria-label="Sign out"><Icon n="out" /></button></div>
      </aside>

      <section className="main">
        <header className="topbar">
          <h1>Overview</h1>
          <label className="search"><Icon n="search" /><input placeholder="Search drivers" aria-label="Search drivers" /></label>
          <button className="btn-sm"><Icon n="cal" /> Today, 20 Oct</button>
          <ThemeToggle theme={theme} onClick={onToggleTheme} />
          <div className="bell-wrap">
            <button className="icon-btn" onClick={() => setBell((b) => !b)} aria-label="Notifications"><Icon n="bell" />{!empty && <i className="dot" />}</button>
            {bell && (
              <div className="glass pop">
                <div className="pop-h"><b>Notifications</b><button className="link">Mark all as read</button></div>
                {["NEW", "EARLIER"].map((g) => (
                  <div key={g}><small className="cap">{g}</small>
                    {NOTES.filter((n) => n[4] === (g === "NEW")).map((n) => (
                      <div className="note" key={n[1]}><span className="ico-box"><Icon n={n[0]} /></span>
                        <div><b>{n[1]}</b><small className="muted">{n[2]}</small></div><small className="muted">{n[3]}</small></div>
                    ))}</div>
                ))}
                <button className="link center">Open Alert History ›</button>
              </div>
            )}
          </div>
        </header>

        {toast && !empty && !loading && (
          <div className="glass toast"><span className="ico-box red"><Icon n="drowsy" /></span>
            <div><b>Drowsiness alert</b><small className="muted">Omar Khaled · Nasr City → New Cairo<br />Driver was alerted in the car 1.4 s after detection.</small>
              <div className="acts"><button className="btn-sm solid">View trip</button><button className="link" onClick={() => setToast(false)}>Dismiss</button></div></div></div>
        )}

        {loading ? (
          <div className="skel"><i /><i /><i /><i /><i className="wide" /><i className="tall" /></div>
        ) : empty ? (
          <>
            <div><h2>Welcome to Drive Guard, Mona</h2><p className="muted">Your dashboard fills up once your drivers start their first trips.</p></div>
            <div className="card"><h3>Get your fleet set up</h3>
              {[["Add your drivers", "We text each driver a link to install the app."], ["Drivers finish setup", "They allow the camera and place the phone on the dashboard mount."], ["First trip", "Trips, alerts and risk scores show up here automatically."]].map(([t, d], i) => (
                <div className="step" key={t}><span className="num">{i + 1}</span><div><b>{t}</b><small className="muted">{d}</small></div>{i === 0 && <button className="btn-sm solid">Add drivers</button>}</div>
              ))}</div>
            <div className="grid-eq">
              <div className="card center-box"><h3>Fleet risk trend</h3><span className="ico-box"><Icon n="trend" /></span><b>No trend yet</b><small className="muted">You’ll see the weekly risk trend after the first week of trips.</small></div>
              <div className="card center-box"><h3>Recent alerts</h3><span className="ico-box"><Icon n="check" /></span><b>No alerts — that’s good</b><small className="muted">Drowsiness and phone-use alerts will be listed here as they happen.</small></div>
            </div>
          </>
        ) : (
          <>
            <div className="stats">{STATS.map(([l, v, n, c]) => (
              <div className="card stat" key={l}><small className="cap">{l}</small><strong>{v}</strong><small className={`delta ${c}`}>{n}</small></div>
            ))}</div>
            <div className="grid2">
              <div className="card"><div className="card-h"><h3>Fleet risk trend · last 8 weeks</h3><small className="muted">Avg. score per week</small></div><Chart /></div>
              <div className="card"><div className="card-h"><h3>Highest-risk drivers</h3><button className="link">View all</button></div>
                {DRIVERS.map(([n, t, a, s, l]) => (
                  <div className="drv" key={n}><div><b>{n}</b><small className="muted">{t} trips · {a} alerts</small><Sev level={l} score={s} /></div><Icon n="right" /></div>
                ))}</div>
            </div>
            <div className="card"><div className="card-h"><h3>Recent alerts</h3><button className="link">Open Alert History</button></div>
              <div className="scroll"><table>
                <thead><tr><th>DATE &amp; TIME</th><th>DRIVER</th><th>TYPE</th><th>SEVERITY</th><th>TRIP</th></tr></thead>
                <tbody>{ALERTS.map((a) => (
                  <tr key={a[0]}><td>{a[0]}</td><td><b>{a[1]}</b></td><td><span className="type"><Icon n={a[3]} />{a[2]}</span></td><td><Sev level={a[4]} /></td><td><a href="#">View trip ›</a></td></tr>
                ))}</tbody></table></div></div>
          </>
        )}
      </section>
    </div>
  );
}
