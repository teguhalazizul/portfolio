import { useEffect, useRef, useState } from "react";
import photo from "./assets/photo.jpeg";
import { profile, stats, experience, projects, achievements, orgs, skills } from "./data.js";

/* ---------- hooks & helpers ---------- */
function useInView(once = true, threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);
  return [ref, seen];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ value, decimals = 0, suffix = "" }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1400, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Typing({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(
      () => {
        if (!del) {
          setTxt(w.slice(0, txt.length + 1));
          if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1200);
        } else {
          setTxt(w.slice(0, txt.length - 1));
          if (txt.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); }
        }
      },
      del ? 35 : 75
    );
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return <span className="typing">{txt}<i className="caret" /></span>;
}

/* ---------- ui bits ---------- */
function Cursor() {
  const dot = useRef(null);
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      setBig(!!e.target.closest("a,button,.project"));
    };
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={dot} className={`cursor ${big ? "big" : ""}`} />;
}

function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => setP(window.scrollY / (document.documentElement.scrollHeight - innerHeight || 1));
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} />;
}

function Nav({ theme, toggle }) {
  const links = [["about", "About"], ["experience", "Experience"], ["projects", "Projects"], ["achievements", "Achievements"], ["contact", "Contact"]];
  return (
    <header className="nav">
      <a href="#top" className="logo">TA<span>.</span></a>
      <nav>
        {links.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}
        <a className="nav-book" href={profile.booking} target="_blank" rel="noreferrer">Book a Session ↗</a>
        <button className="theme" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? "◐ Light" : "◑ Dark"}</button>
      </nav>
    </header>
  );
}

const Section = ({ id, no, title, children }) => (
  <section id={id} className="section">
    <Reveal><div className="sec-head"><span className="mono">{no}</span><h2>{title}</h2><div className="rule" /></div></Reveal>
    {children}
  </section>
);

/* ---------- sections ---------- */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="mono hello"><span className="dot" /> Available for new opportunities</p>
        <h1 aria-label={profile.name}>
          {profile.name.split(" ").map((w, wi) => (
            <span className="word" key={wi}>
              {w.split("").map((c, ci) => (
                <span className="letter" key={ci} style={{ animationDelay: `${(wi * 5 + ci) * 45 + 200}ms` }}>{c}</span>
              ))}
            </span>
          ))}
        </h1>
        <p className="role"><Typing words={profile.roles} /></p>
        <p className="lead">Building web apps, Android apps, and machine learning solutions — from idea and system design to deployment.</p>
        <div className="cta">
          <a className="btn solid" href="#projects">View Projects ↓</a>
          <a className="btn" href="#contact">Contact Me</a>
        </div>
      </div>
      <div className="hero-photo">
        <div className="ring" />
        <img src={photo} alt="Photo of Teguh Al Azizul" />
        <span className="badge b1 mono">GPA 3.76</span>
        <span className="badge b2 mono">Outstanding Student 2026</span>
      </div>
      <a href="#about" className="scroll mono">scroll<i /></a>
    </section>
  );
}

function Marquee() {
  const row = [...skills, ...skills];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{row.map((s, i) => <span key={i}>{s}<b>✦</b></span>)}</div>
    </div>
  );
}

function About() {
  return (
    <Section id="about" no="01" title="About">
      <div className="about">
        <Reveal><p className="big">{profile.about}</p></Reveal>
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="stat">
              <strong><Counter {...s} /></strong><span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" no="02" title="Experience">
      <div className="timeline">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 120} className="tl-item">
            <span className="tl-dot" />
            <p className="mono muted">{e.period}</p>
            <h3>{e.role} <em>@ {e.company}</em></h3>
            <p className="muted">{e.desc}</p>
          </Reveal>
        ))}
      </div>
      <Reveal><h3 className="sub">Organizations & Leadership</h3></Reveal>
      <div className="grid2">
        {orgs.map((o, i) => (
          <Reveal key={o.role} delay={(i % 2) * 100} className="card">
            <p className="mono muted">{o.period}</p>
            <h4>{o.role}</h4>
            <p className="where">{o.where}</p>
            <p className="muted">{o.desc}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="projects" no="03" title="Selected Projects">
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 4) * 60}>
            <article className={`project ${open === i ? "open" : ""}`} onMouseEnter={() => setOpen(i)} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="p-row">
                <span className="mono idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <span className="mono yr">{p.year}</span>
                <span className="arrow">↗</span>
              </div>
              <div className="p-body"><div>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map((t) => <span key={t} className="mono">{t}</span>)}</div>
              </div></div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements" no="04" title="Achievements">
      <div className="ach">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 80} className="ach-item">
            <span className="mono year">{a.year}</span>
            <h4>{a.title}</h4>
            <p className="muted">{a.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" no="05" title="Contact">
      <Reveal>
        <a className="mail" href={`mailto:${profile.email}`}>Let's work together<span>{profile.email} ↗</span></a>
      </Reveal>
      <Reveal delay={60}>
        <div className="book">
          <div>
            <h3>Want to discuss a project?</h3>
            <p className="muted">Have an idea for a web app, Android app, or machine learning solution? Book a discussion session directly through my calendar.</p>
          </div>
          <a className="btn solid" href={profile.booking} target="_blank" rel="noreferrer">Book a Session ↗</a>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="cta">
          <a className="btn solid" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  return (
    <>
      <Cursor /><Progress />
      <Nav theme={theme} toggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <Hero /><Marquee /><About /><Experience /><Projects /><Achievements /><Contact />
      </main>
    </>
  );
}
