import { useState, useEffect } from "react";
import { Brand, Icon, ThemeToggle } from "./ui.jsx";

const D = "M-20 520 C200 430 380 390 520 290 S760 130 840 110";
const Road = () => (
  <>
    <div className="glow" />
    <svg className="road" viewBox="0 0 800 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d={D} fill="none" stroke="var(--road)" strokeWidth="80" />
      <path d={D} fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="16 16" opacity=".5" />
      <g transform="translate(300 420) rotate(-20)"><rect x="-18" y="-9" width="36" height="18" rx="6" fill="#fff" /><rect x="-6" y="-7" width="12" height="14" rx="3" fill="#8a8a92" /></g>
      <g transform="translate(470 305) rotate(-35)" opacity=".7"><rect x="-18" y="-9" width="36" height="18" rx="6" fill="#9a9aa2" /></g>
    </svg>
    <div className="pill safe"><i /> Driver awake · Safe</div>
  </>
);
const Field = ({ icon, bad, ...p }) => (
  <div className={"field" + (bad ? " bad" : "")}><Icon n={icon} /><input {...p} />{bad && <Icon n="warn" />}</div>
);

export default function Login({ theme, onToggleTheme, onSuccess }) {
  const [step, setStep] = useState("signin"); // signin | forgot | sent | reset
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [wait, setWait] = useState(45);
  const [np, setNp] = useState("");
  const [cp, setCp] = useState("");

  useEffect(() => {
    if (step !== "sent" || wait <= 0) return;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [step, wait]);

  const signIn = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid work email.");
    setError(""); setBusy(true);
    // TODO: replace with the real login request to the backend
    setTimeout(() => {
      setBusy(false);
      if (pass.length < 6) setError("Wrong password. Check Caps Lock and try again.");
      else onSuccess();
    }, 900);
  };
  const rules = [
    ["At least 8 characters", np.length >= 8], ["Includes a number", /\d/.test(np)],
    ["Includes a symbol (!@#…)", /[^A-Za-z0-9]/.test(np)], ["Both passwords match", np !== "" && np === cp],
  ];
  const resetOk = rules.every((r) => r[1]);

  return (
    <main className="login">
      <Road />
      <header className="login-top"><Brand /><ThemeToggle theme={theme} onClick={onToggleTheme} /></header>
      <section className="hero">
        <h1>See risk before it becomes an accident.</h1>
        <p>Live drowsiness and phone-use alerts for your whole fleet.</p>
      </section>

      <div className="glass login-card">
        {step === "signin" && (
          <form onSubmit={signIn} noValidate>
            <h2>Sign in to your fleet dashboard</h2>
            <p className="muted sub">Use your company email.</p>
            <label>Work email<Field icon="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mona.adel@nilefleet.com" /></label>
            <small className="hint">Your account is set up when your company joins Drive Guard.</small>
            <label>Password<Field icon="lock" bad={!!error && error.startsWith("Wrong")} type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" /></label>
            {error && <p className="err" role="alert">{error}</p>}
            <div className="row">
              <label className="switch"><input type="checkbox" defaultChecked /><b /> Keep me signed in</label>
              <button type="button" className="link" onClick={() => setStep("forgot")}>Forgot password?</button>
            </div>
            <button className="btn" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
          </form>
        )}
        {step === "forgot" && (
          <form onSubmit={(e) => { e.preventDefault(); setWait(45); setStep("sent"); }}>
            <h2>Reset your password</h2>
            <p className="muted sub">Enter your work email and we’ll send you a link to set a new password.</p>
            <label>Work email<Field icon="mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <button className="btn">Send reset link</button>
            <button type="button" className="link center" onClick={() => setStep("signin")}>‹ Back to sign in</button>
          </form>
        )}
        {step === "sent" && (
          <div>
            <span className="ico-box"><Icon n="mail" /></span>
            <h2>Check your email</h2>
            <p className="muted sub">We sent a reset link to {email || "your email"}. It works for 30 minutes.</p>
            <button className="btn ghost" disabled={wait > 0} onClick={() => setWait(45)}>
              {wait > 0 ? `Resend link in 0:${String(wait).padStart(2, "0")}` : "Resend link"}
            </button>
            <small className="hint">Can’t find it? Check your spam folder or ask your company admin.</small>
            <button className="link center" onClick={() => setStep("reset")}>Open reset page (demo)</button>
            <button className="link center" onClick={() => setStep("signin")}>‹ Back to sign in</button>
          </div>
        )}
        {step === "reset" && (
          <form onSubmit={(e) => { e.preventDefault(); if (resetOk) setStep("signin"); }}>
            <h2>Set a new password</h2>
            <p className="muted sub">Choose a password you don’t use anywhere else.</p>
            <label>New password<Field icon="lock" type="password" value={np} onChange={(e) => setNp(e.target.value)} /></label>
            <label>Confirm password<Field icon="lock" type="password" value={cp} onChange={(e) => setCp(e.target.value)} /></label>
            <ul className="rules">{rules.map(([t, ok]) => <li key={t} className={ok ? "ok" : ""}><Icon n={ok ? "check" : "warn"} s={12} /> {t}</li>)}</ul>
            <button className="btn" disabled={!resetOk}>Save and sign in</button>
          </form>
        )}
      </div>
    </main>
  );
}
