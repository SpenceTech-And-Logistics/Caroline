import { useEffect, useRef, useState } from 'react'
import { person, contact, about, stats, topSkills, experience, education, skillGroups } from './content.js'

const NAV = [['about', 'About'], ['experience', 'Experience'], ['education', 'Education'], ['skills', 'Skills'], ['contact', 'Contact']]

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Adds .in to every [data-reveal] element as it scrolls into view (each item on its own, so long lists animate as you reach them).
function useRevealAll() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')]
    if (reduceMotion() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Scroll-linked values: page progress bar, header shrink, timeline line drawing.
function useScrollEffects(setScrolled, setActive) {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const max = root.scrollHeight - innerHeight
      root.style.setProperty('--sp', max > 0 ? (scrollY / max).toFixed(4) : 0)
      setScrolled(scrollY > 12)
      root.classList.toggle('far', scrollY > 700)
      let cur = ''
      if (scrollY + innerHeight >= root.scrollHeight - 4) cur = NAV[NAV.length - 1][0]
      else NAV.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.45) cur = id })
      setActive(cur)
      const tl = document.querySelector('.timeline')
      if (tl) {
        const r = tl.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height))
        tl.style.setProperty('--tp', reduceMotion() ? 1 : p.toFixed(4))
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [setScrolled, setActive])
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <p className="label" data-reveal>{label}</p>
        <h2 data-reveal style={{ '--i': 1 }}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function CountUp({ value }) {
  const m = String(value).match(/^(\d+)(.*)$/)
  const target = m ? Number(m[1]) : 0
  const ref = useRef(null)
  const [n, setN] = useState(m && !reduceMotion() ? 0 : target)
  useEffect(() => {
    if (!m || reduceMotion() || !('IntersectionObserver' in window)) { setN(target); return }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now(), dur = 1400
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur)
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [target])
  if (!m) return <b>{value}</b>
  return <b ref={ref} aria-label={value}>{n}{m[2]}</b>
}

function Header({ scrolled, active }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="progress" aria-hidden="true" />
      <div className="wrap top-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}><span className="mono">CM</span><span className="bn">{person.name}</span></a>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        <nav className={open ? 'open' : ''}>
          {NAV.map(([id, t]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>{t}</a>)}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <span className="glow g1" aria-hidden="true" />
      <span className="glow g2" aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-text">
          <p className="label gold enter" style={{ '--i': 0 }}>{person.eyebrow}</p>
          <h1 className="enter" style={{ '--i': 1 }}>{person.name}</h1>
          <p className="title enter" style={{ '--i': 2 }}>{person.title}</p>
          <ul className="chips dark">{person.focus.map((f, i) => <li key={f} className="enter pop" style={{ '--i': 3 + i * 0.5 }}>{f}</li>)}</ul>
          <p className="aff enter" style={{ '--i': 6 }}>{person.affiliations}</p>
          <div className="hero-cta enter" style={{ '--i': 6.5 }}>
            <a className="btn" href="#experience">View experience</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </div>
        <figure className="portrait">
          <img src={person.photo} alt={`Portrait of ${person.name}`} />
        </figure>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <div className="stats">
      <div className="wrap stats-in">
        {stats.map((s, i) => <div key={s.label} data-reveal style={{ '--i': i }}><CountUp value={s.value} /><span>{s.label}</span></div>)}
      </div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" label="About" title="Operations, finance and strategy, with a teacher's habit">
      <div className="about">
        <div>{about.map((p, i) => <p key={p} data-reveal style={{ '--i': i + 2 }}>{p}</p>)}</div>
        <aside className="top-skills" data-reveal style={{ '--i': 3 }}>
          <h3>Top skills</h3>
          <ul>{topSkills.map((s, i) => <li key={s} style={{ '--j': i }}>{s}</li>)}</ul>
        </aside>
      </div>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience" label="Experience" title="A career across five organisations">
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.org + e.role} data-reveal>
            <span className="dot" />
            <div className="job">
              {e.logo
                ? <div className="logo"><img src={e.logo} alt={`${e.org} logo`} loading="lazy" /></div>
                : <div className="logo ph" aria-hidden="true">{e.org.split(' ').filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')}</div>}
              <div className="jb">
                <p className="dates">{e.dates}</p>
                <h3>{e.role}</h3>
                <p className="org">{e.org}</p>
                <p className="meta">{e.place}</p>
                {e.points && <ul className="points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>}
                {e.skills && <ul className="chips">{e.skills.map((s, i) => <li key={s} style={{ '--j': i }}>{s}</li>)}</ul>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" label="Education" title="Business and finance, taught and studied">
      <div className="edu">
        {education.map((e, i) => (
          <article key={e.award} className="edu-card" data-reveal style={{ '--i': i }}>
            <div className="logo"><img src={e.logo} alt={`${e.school} logo`} loading="lazy" /></div>
            <div>
              <p className="dates">{e.years}</p>
              <h3>{e.award}</h3>
              <p className="org">{e.school}</p>
              {e.skills && <p className="meta">{e.skills}</p>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" label="Skills" title="What I bring">
      <div className="sg">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="sg-card" data-reveal style={{ '--i': i }}>
            <h3>{g.title}</h3>
            <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const rows = [
    contact.email && ['Email', contact.email, `mailto:${contact.email}`],
    contact.phone && ['Phone', contact.phone, `tel:${contact.phone.replace(/\s/g, '')}`],
    contact.linkedin && ['LinkedIn', 'View profile', contact.linkedin],
    contact.location && ['Based in', contact.location, null],
  ].filter(Boolean)
  async function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      const r = await fetch(`https://formspree.io/f/${contact.formspree}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (r.ok) setSent(true)
    } catch { /* leave form visible */ }
  }
  return (
    <Section id="contact" label="Contact" title="Let's connect">
      <div className="contact">
        <ul className="clist" data-reveal style={{ '--i': 2 }}>
          {rows.map(([k, v, href]) => <li key={k}><span>{k}</span>{href ? <a href={href}>{v}</a> : <b>{v}</b>}</li>)}
        </ul>
        {contact.formspree && (sent ? <p className="thanks">Thank you. Your message has been sent.</p> : (
          <form onSubmit={submit} data-reveal style={{ '--i': 3 }}>
            <input name="name" placeholder="Your name" required />
            <input name="email" type="email" placeholder="Your email" required />
            <textarea name="message" placeholder="How can I help?" rows="4" required />
            <button className="btn" type="submit">Send message</button>
          </form>
        ))}
      </div>
    </Section>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  useScrollEffects(setScrolled, setActive)
  useRevealAll()
  return (
    <>
      <Header scrolled={scrolled} active={active} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap">
          <p>© {new Date().getFullYear()} {person.name}</p>
          <p>Built by SpenceTec and Logistics Limited</p>
        </div>
      </footer>
      <a href="#top" className="to-top" aria-label="Back to top">↑</a>
    </>
  )
}
