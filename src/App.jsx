import { useEffect, useRef, useState } from 'react'
import { person, contact, about, stats, topSkills, experience, education, skillGroups } from './content.js'

const NAV = [['about', 'About'], ['experience', 'Experience'], ['education', 'Education'], ['skills', 'Skills'], ['contact', 'Contact']]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Section({ id, label, title, children }) {
  const ref = useReveal()
  return (
    <section id={id} className="section reveal" ref={ref}>
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="top">
      <div className="wrap top-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}><span className="mono">CM</span><span className="bn">{person.name}</span></a>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        <nav className={open ? 'open' : ''}>
          {NAV.map(([id, t]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t}</a>)}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-in">
        <div className="hero-text">
          <p className="label gold">{person.eyebrow}</p>
          <h1>{person.name}</h1>
          <p className="title">{person.title}</p>
          <ul className="chips dark">{person.focus.map((f) => <li key={f}>{f}</li>)}</ul>
          <p className="aff">{person.affiliations}</p>
          <div className="hero-cta">
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
        {stats.map((s) => <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
      </div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" label="About" title="Operations, finance and strategy, with a teacher's habit">
      <div className="about">
        <div>{about.map((p) => <p key={p}>{p}</p>)}</div>
        <aside className="top-skills">
          <h3>Top skills</h3>
          <ul>{topSkills.map((s) => <li key={s}>{s}</li>)}</ul>
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
          <li key={e.org + e.role}>
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
                {e.skills && <ul className="chips">{e.skills.map((s) => <li key={s}>{s}</li>)}</ul>}
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
        {education.map((e) => (
          <article key={e.award} className="edu-card">
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
        {skillGroups.map((g) => (
          <div key={g.title} className="sg-card">
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
        <ul className="clist">
          {rows.map(([k, v, href]) => <li key={k}><span>{k}</span>{href ? <a href={href}>{v}</a> : <b>{v}</b>}</li>)}
        </ul>
        {contact.formspree && (sent ? <p className="thanks">Thank you. Your message has been sent.</p> : (
          <form onSubmit={submit}>
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
  return (
    <>
      <Header />
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
    </>
  )
}
