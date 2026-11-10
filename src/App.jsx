import { createContext, useContext, useEffect, useRef, useState } from "react";
import photo from "./assets/photo.jpeg";
import { profile, skills, content } from "./data.js";

const LangCtx = createContext(content("en"));
const useT = () => useContext(LangCtx);

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

function Intro({ onReveal, onDone }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  const fired = useRef(false);
  const finish = () => {
    if (fired.current) return;
    fired.current = true;
    setOut(true);
    onReveal();
    setTimeout(onDone, 1100);
  };
  useEffect(() => {
    let raf, s;
    const tick = (ts) => {
      s ??= ts;
      const p = Math.min((ts - s) / 1900, 1);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 2.4))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`intro ${out ? "out" : ""}`} onClick={finish}>
      <div className="curtain top" /><div className="curtain bottom" />
      <div className="intro-inner">
        <div className="intro-count">{String(n).padStart(3, "0")}</div>
        <div className="intro-name mono">Teguh Al Azizul — Portfolio</div>
        <div className="intro-bar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
      </div>
      <span className="intro-skip mono">click to skip</span>
    </div>
  );
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    let w, h, pts, raf;
    const init = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(Math.floor(w / 16), 80);
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };
    const move = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#fff";
      ctx.fillStyle = fg; ctx.strokeStyle = fg;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, dm = Math.hypot(dx, dy);
        if (dm < 120 && dm > 0) { p.x += (dx / dm) * 1.2; p.y += (dy / dm) * 1.2; }
        ctx.globalAlpha = 0.7;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) { ctx.globalAlpha = (1 - d / 110) * 0.35; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); window.removeEventListener("mousemove", move); };
  }, []);
  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}

function Nav({ theme, toggle, lang, toggleLang }) {
  const t = useT();
  const ids = ["about", "experience", "projects", "achievements", "contact"];
  return (
    <header className="nav">
      <a href="#top" className="logo">TA<span>.</span></a>
      <nav>
        {ids.map((id) => <a key={id} href={`#${id}`}>{t.ui.nav[id]}</a>)}
        <a className="nav-book" href={profile.booking} target="_blank" rel="noreferrer">{t.ui.navBook}</a>
        <button className="lang" onClick={toggleLang} aria-label={t.ui.langLabel}>
          <span className={lang === "en" ? "on" : ""}>EN</span>
          <span className={lang === "id" ? "on" : ""}>ID</span>
        </button>
        <button className="theme" onClick={toggle} aria-label={t.ui.themeLabel}>{theme === "dark" ? t.ui.light : t.ui.dark}</button>
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
  const t = useT();
  const ref = useRef(null);
  const spot = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const tilt = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 14}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
  };
  const untilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  return (
    <section id="top" className="hero" ref={ref} onMouseMove={spot}>
      <Particles />
      <div className="hero-text">
        <p className="mono hello"><span className="dot" /> {t.ui.hello}</p>
        <h1 aria-label={profile.name}>
          {profile.name.split(" ").map((w, wi) => (
            <span className="word" key={wi}>
              {w.split("").map((c, ci) => (
                <span className="letter" key={ci} style={{ animationDelay: `${(wi * 5 + ci) * 45 + 200}ms` }}>{c}</span>
              ))}
            </span>
          ))}
        </h1>
        <p className="role"><Typing words={t.roles} /></p>
        <p className="lead">{t.ui.lead}</p>
        <div className="cta">
          <a className="btn solid" href="#projects">{t.ui.viewProjects}</a>
          <a className="btn" href="#contact">{t.ui.contactMe}</a>
        </div>
      </div>
      <div className="hero-photo">
        <div className="ring" />
        <div className="photo-pop">
          <div className="photo-card" onMouseMove={tilt} onMouseLeave={untilt}>
            <img src={photo} alt={t.ui.photoAlt} />
          </div>
          <span className="badge b1 mono">{t.ui.badgeGpa}</span>
          <span className="badge b2 mono">{t.ui.badgeAward}</span>
        </div>
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
  const t = useT();
  return (
    <Section id="about" no="01" title={t.ui.secAbout}>
      <div className="about">
        <Reveal><p className="big">{t.about}</p></Reveal>
        <div className="stats">
          {t.stats.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="stat">
              <strong><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} /></strong><span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  const t = useT();
  return (
    <Section id="experience" no="02" title={t.ui.secExp}>
      <div className="timeline">
        {t.experience.map((e, i) => (
          <Reveal key={i} delay={i * 120} className="tl-item">
            <span className="tl-dot" />
            <p className="mono muted">{e.period}</p>
            <h3>{e.role} <em>@ {e.company}</em></h3>
            <p className="muted">{e.desc}</p>
          </Reveal>
        ))}
      </div>
      <Reveal><h3 className="sub">{t.ui.orgsTitle}</h3></Reveal>
      <div className="grid2">
        {t.orgs.map((o, i) => (
          <Reveal key={i} delay={(i % 2) * 100} className="card">
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
  const t = useT();
  const [open, setOpen] = useState(0);
  return (
    <Section id="projects" no="03" title={t.ui.secProj}>
      <div className="projects">
        {t.projects.map((p, i) => (
          <Reveal key={i} delay={(i % 4) * 60}>
            <article className={`project ${open === i ? "open" : ""}`} onMouseEnter={() => setOpen(i)} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="p-row">
                <span className="mono idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <span className="mono yr">{p.year}</span>
                <span className="arrow">↗</span>
              </div>
              <div className="p-body"><div>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map((tag) => <span key={tag} className="mono">{tag}</span>)}</div>
              </div></div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  const t = useT();
  return (
    <Section id="achievements" no="04" title={t.ui.secAch}>
      <div className="ach">
        {t.achievements.map((a, i) => (
          <Reveal key={i} delay={(i % 3) * 80} className="ach-item">
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
  const t = useT();
  return (
    <Section id="contact" no="05" title={t.ui.secContact}>
      <Reveal>
        <a className="mail" href={`mailto:${profile.email}`}>{t.ui.letsWork}<span>{profile.email} ↗</span></a>
      </Reveal>
      <Reveal delay={60}>
        <div className="book">
          <div>
            <h3>{t.ui.bookTitle}</h3>
            <p className="muted">{t.ui.bookText}</p>
          </div>
          <a className="btn solid" href={profile.booking} target="_blank" rel="noreferrer">{t.ui.bookBtn}</a>
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
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; } });
  const [lang, setLang] = useState(() => { try { return localStorage.getItem("lang") || "en"; } catch { return "en"; } });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [intro, setIntro] = useState(!reduce);
  const reveal = () => { document.documentElement.classList.add("ready"); document.body.classList.remove("lock"); };
  useEffect(() => {
    if (reduce) reveal(); else document.body.classList.add("lock");
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const sel = ".btn,.nav-book";
    const move = (e) => {
      const b = e.target.closest?.(sel);
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
    };
    const out = (e) => { const b = e.target.closest?.(sel); if (b && !b.contains(e.relatedTarget)) b.style.translate = ""; };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseout", out);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseout", out); };
  }, []);
  return (
    <LangCtx.Provider value={content(lang)}>
      {intro && <Intro onReveal={reveal} onDone={() => setIntro(false)} />}
      <Cursor /><Progress />
      <Nav theme={theme} toggle={() => setTheme(theme === "dark" ? "light" : "dark")} lang={lang} toggleLang={() => setLang(lang === "en" ? "id" : "en")} />
      <main>
        <Hero /><Marquee /><About /><Experience /><Projects /><Achievements /><Contact />
      </main>
    </LangCtx.Provider>
  );
}
