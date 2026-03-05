import { useMemo, useState, type ComponentType, type ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Filter,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MoonStar,
  Search,
  Server,
  Wrench
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Education = { degree: string; school: string; period: string; details: string[] }
type Experience = { title: string; company: string; period: string; summary: string }
type Project = { name: string; stack: string; summary: string; github: string; demo?: string }
type StackItem = { name: string; proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; usedOn: string[] }
type Accent = 'cyan' | 'violet' | 'emerald' | 'rose' | 'indigo'
type ProficiencyFilter = 'All' | StackItem['proficiency']
type SectionFilters = {
  educationQuery: string
  experienceQuery: string
  stackQuery: string
  stackProficiency: ProficiencyFilter
  projectsQuery: string
}

const accentStyles: Record<Accent, { icon: string; border: string; soft: string; action: string }> = {
  cyan: { icon: 'text-cyan-300', border: 'border-cyan-900/70', soft: 'bg-cyan-950/25', action: 'border-cyan-800 text-cyan-300' },
  violet: { icon: 'text-violet-300', border: 'border-violet-900/70', soft: 'bg-violet-950/25', action: 'border-violet-800 text-violet-300' },
  emerald: { icon: 'text-emerald-300', border: 'border-emerald-900/70', soft: 'bg-emerald-950/25', action: 'border-emerald-800 text-emerald-300' },
  rose: { icon: 'text-rose-300', border: 'border-rose-900/70', soft: 'bg-rose-950/25', action: 'border-rose-800 text-rose-300' },
  indigo: { icon: 'text-indigo-300', border: 'border-indigo-900/70', soft: 'bg-indigo-950/25', action: 'border-indigo-800 text-indigo-300' }
}

const profile = {
  name: 'Avery Thompson',
  role: 'Backend Software Engineer',
  intro: 'I design resilient backend systems with clear contracts, robust observability, and predictable performance under load.',
  contact: {
    email: 'avery.backend@example.dev',
    linkedin: 'https://linkedin.com/in/avery-backend',
    github: 'https://github.com/avery-backend'
  },
  education: [
    {
      degree: 'MSc Computer Science',
      school: 'University of Manchester',
      period: '2019 — 2021',
      details: [
        'Focused on distributed systems, advanced databases, and cloud-native architecture.',
        'Built a thesis project around fault-tolerant event processing using stream pipelines.',
        'Led a team capstone to design and ship a scalable multi-tenant backend API.'
      ]
    },
    {
      degree: 'BSc Software Engineering',
      school: 'University of Leeds',
      period: '2015 — 2019',
      details: [
        'Learned software design patterns, testing strategy, and systems analysis.',
        'Developed full backend coursework projects with authentication and relational data modeling.',
        'Contributed to a year-long industry collaboration project as backend module lead.'
      ]
    }
  ] as Education[],
  experience: [
    { title: 'Senior Backend Engineer', company: 'Cloudforge Labs', period: '2023 — Present', summary: 'Led service decomposition and cut p95 latency by 45% across core APIs.' },
    { title: 'Backend Engineer', company: 'Finstack Systems', period: '2021 — 2023', summary: 'Built secure payment processing services handling 12M+ monthly transactions.' }
  ] as Experience[],
  stack: [
    { name: 'Go', proficiency: 'Expert', usedOn: ['LedgerStream (project)', 'Cloudforge Labs (job)'] },
    { name: 'Node.js', proficiency: 'Advanced', usedOn: ['AuthBridge (project)', 'Finstack Systems (job)'] },
    { name: 'Python', proficiency: 'Advanced', usedOn: ['OpsPulse (project)', 'Cloudforge Labs (job)'] },
    { name: 'PostgreSQL', proficiency: 'Expert', usedOn: ['LedgerStream (project)', 'Finstack Systems (job)'] },
    { name: 'Redis', proficiency: 'Advanced', usedOn: ['AuthBridge (project)', 'Finstack Systems (job)'] },
    { name: 'Kafka', proficiency: 'Advanced', usedOn: ['LedgerStream (project)', 'Cloudforge Labs (job)'] },
    { name: 'Docker', proficiency: 'Expert', usedOn: ['All featured projects', 'Cloudforge Labs (job)'] },
    { name: 'Kubernetes', proficiency: 'Advanced', usedOn: ['Cloudforge Labs (job)', 'OpsPulse (project deployment)'] },
    { name: 'AWS', proficiency: 'Advanced', usedOn: ['Cloudforge Labs (job)', 'AuthBridge (project deployment)'] }
  ] as StackItem[],
  projects: [
    { name: 'LedgerStream', stack: 'Go · Kafka · PostgreSQL', summary: 'High-throughput transaction ingestion with idempotent write guarantees.', github: 'https://github.com/avery-backend/ledgerstream', demo: 'https://ledgerstream-demo.example.dev' },
    { name: 'AuthBridge', stack: 'Node.js · Redis · OIDC', summary: 'Tenant-aware auth gateway with short-lived tokens and full audit trails.', github: 'https://github.com/avery-backend/authbridge' },
    { name: 'OpsPulse', stack: 'Python · Prometheus · Grafana', summary: 'Unified observability dashboard for traces, metrics, and incident context.', github: 'https://github.com/avery-backend/opspulse', demo: 'https://opspulse.example.dev' }
  ] as Project[]
}

const initialFilters: SectionFilters = {
  educationQuery: '',
  experienceQuery: '',
  stackQuery: '',
  stackProficiency: 'All',
  projectsQuery: ''
}

function includesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.toLowerCase())
}

function SectionTitle({ icon: Icon, children, accent }: { icon: ComponentType<{ className?: string }>; children: string; accent: Accent }) {
  return <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-100"><Icon className={`h-5 w-5 ${accentStyles[accent].icon}`} />{children}</h2>
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-200">{children}</div>
}

function DesignSwitcher() {
  const { pathname } = useLocation()
  return <div className="mx-auto mb-8 flex max-w-6xl flex-wrap gap-2">{[1, 2, 3, 4, 5].map((id) => <Link key={id} to={`/${id}`}><Button variant={pathname === `/${id}` ? 'default' : 'outline'} size="sm"><MoonStar className="h-4 w-4" /> Design {id}</Button></Link>)}</div>
}

function SectionFilterInput({ accent, value, onChange, placeholder }: { accent: Accent; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className={`mt-3 flex items-center gap-2 rounded-md border bg-slate-900 px-3 py-2 text-sm text-slate-300 ${accentStyles[accent].border}`}>
      <Search className={`h-4 w-4 ${accentStyles[accent].icon}`} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent outline-none placeholder:text-slate-500" />
    </label>
  )
}

function EducationSection({ accent, filters, setFilters }: { accent: Accent; filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const items = useMemo(() => profile.education.filter((item) => includesQuery(`${item.degree} ${item.school} ${item.period} ${item.details.join(' ')}`, filters.educationQuery)), [filters.educationQuery])
  return (
    <section>
      <SectionTitle icon={GraduationCap} accent={accent}>Education</SectionTitle>
      <SectionFilterInput accent={accent} value={filters.educationQuery} onChange={(v) => setFilters({ ...filters, educationQuery: v })} placeholder="Filter education..." />
      <div className="mt-3 space-y-3">
        {items.map((item) => <div key={item.degree} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}><p className="font-medium text-slate-100">{item.degree}</p><p className="text-sm text-slate-400">{item.school}</p><p className="text-xs text-slate-500">{item.period}</p><ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-300">{item.details.map((d) => <li key={d}>{d}</li>)}</ul></div>)}
        {!items.length && <p className="text-sm text-slate-500">No education entries match this section filter.</p>}
      </div>
    </section>
  )
}

function ExperienceSection({ accent, filters, setFilters }: { accent: Accent; filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const items = useMemo(() => profile.experience.filter((item) => includesQuery(`${item.title} ${item.company} ${item.period} ${item.summary}`, filters.experienceQuery)), [filters.experienceQuery])
  return (
    <section>
      <SectionTitle icon={BriefcaseBusiness} accent={accent}>Experience</SectionTitle>
      <SectionFilterInput accent={accent} value={filters.experienceQuery} onChange={(v) => setFilters({ ...filters, experienceQuery: v })} placeholder="Filter experience..." />
      <div className="mt-3 space-y-3">
        {items.map((item) => <div key={item.company + item.title} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}><p className="font-medium text-slate-100">{item.title} · {item.company}</p><p className="text-xs text-slate-500">{item.period}</p><p className="text-sm text-slate-300">{item.summary}</p></div>)}
        {!items.length && <p className="text-sm text-slate-500">No experience entries match this section filter.</p>}
      </div>
    </section>
  )
}

function TechSection({ accent, filters, setFilters }: { accent: Accent; filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const proficiencyStyles: Record<StackItem['proficiency'], string> = {
    Beginner: 'text-amber-300 border-amber-900/60 bg-amber-950/40',
    Intermediate: 'text-sky-300 border-sky-900/60 bg-sky-950/40',
    Advanced: 'text-indigo-300 border-indigo-900/60 bg-indigo-950/40',
    Expert: 'text-emerald-300 border-emerald-900/60 bg-emerald-950/40'
  }
  const items = useMemo(() => profile.stack.filter((item) => includesQuery(`${item.name} ${item.proficiency} ${item.usedOn.join(' ')}`, filters.stackQuery) && (filters.stackProficiency === 'All' || item.proficiency === filters.stackProficiency)), [filters.stackQuery, filters.stackProficiency])
  return (
    <section>
      <SectionTitle icon={Wrench} accent={accent}>Tech Stack</SectionTitle>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
        <SectionFilterInput accent={accent} value={filters.stackQuery} onChange={(v) => setFilters({ ...filters, stackQuery: v })} placeholder="Filter tech stack..." />
        <label className={`flex items-center gap-2 rounded-md border bg-slate-900 px-3 py-2 text-sm text-slate-300 ${accentStyles[accent].border}`}><Filter className={`h-4 w-4 ${accentStyles[accent].icon}`} /><select value={filters.stackProficiency} onChange={(e) => setFilters({ ...filters, stackProficiency: e.target.value as ProficiencyFilter })} className="bg-transparent outline-none"><option value="All">All proficiency</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option><option value="Expert">Expert</option></select></label>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((tech) => <div key={tech.name} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium text-slate-100">{tech.name}</p><Badge className={`border ${proficiencyStyles[tech.proficiency]}`}>{tech.proficiency}</Badge></div><p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Used on projects / jobs</p><ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-300">{tech.usedOn.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
        {!items.length && <p className="text-sm text-slate-500">No stack entries match this section filter.</p>}
      </div>
    </section>
  )
}

function ProjectsSection({ accent, filters, setFilters }: { accent: Accent; filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const items = useMemo(() => profile.projects.filter((project) => includesQuery(`${project.name} ${project.stack} ${project.summary} ${project.github} ${project.demo ?? ''}`, filters.projectsQuery)), [filters.projectsQuery])
  return (
    <section>
      <SectionTitle icon={Code2} accent={accent}>Featured Projects</SectionTitle>
      <SectionFilterInput accent={accent} value={filters.projectsQuery} onChange={(v) => setFilters({ ...filters, projectsQuery: v })} placeholder="Filter projects..." />
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {items.map((project) => <Card key={project.name} className={`border bg-slate-900 text-slate-200 ${accentStyles[accent].border}`}><CardHeader className="pb-2"><CardTitle className="text-base text-slate-100">{project.name}</CardTitle></CardHeader><CardContent><p className="text-xs text-slate-500">{project.stack}</p><p className="mt-2 text-sm text-slate-300">{project.summary}</p><div className="mt-4 flex gap-2"><a href={project.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-slate-800 ${accentStyles[accent].action}`}><Github className="h-3.5 w-3.5" /> GitHub</a>{project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-slate-800 ${accentStyles[accent].action}`}><ExternalLink className="h-3.5 w-3.5" /> Live Demo</a> : null}</div></CardContent></Card>)}
        {!items.length && <p className="text-sm text-slate-500">No project entries match this section filter.</p>}
      </div>
    </section>
  )
}

function Hero({ accent = 'cyan' }: { accent?: Accent }) {
  const accents = {
    cyan: 'from-cyan-500/20 to-slate-900 border-cyan-900',
    violet: 'from-violet-500/20 to-slate-900 border-violet-900',
    emerald: 'from-emerald-500/20 to-slate-900 border-emerald-900',
    rose: 'from-rose-500/20 to-slate-900 border-rose-900',
    indigo: 'from-indigo-500/20 to-slate-900 border-indigo-900'
  }
  return <section className={`rounded-2xl border bg-gradient-to-br p-6 ${accents[accent]}`}><p className={`mb-2 flex items-center gap-2 text-sm ${accentStyles[accent].icon}`}><Server className="h-4 w-4" /> Hero / Introduction</p><h1 className="text-4xl font-bold text-white">{profile.name}</h1><p className="text-lg text-slate-300">{profile.role}</p><p className="mt-3 max-w-3xl text-slate-300">{profile.intro}</p><div className="mt-5 flex flex-wrap gap-2"><a href={`mailto:${profile.contact.email}`} className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}><Mail className="h-4 w-4" /> Email</a><a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}><Linkedin className="h-4 w-4" /> LinkedIn</a><a href={profile.contact.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}><Github className="h-4 w-4" /> GitHub</a></div></section>
}

function LayoutPanel({ children, accent }: { children: ReactNode; accent: Accent }) {
  return <div className={`rounded-xl border p-4 md:p-5 ${accentStyles[accent].border} ${accentStyles[accent].soft}`}>{children}</div>
}

function DesignOne({ filters, setFilters }: { filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const accent: Accent = 'cyan'
  return <Shell><Hero accent={accent} /><div className="mt-6 grid gap-6 md:grid-cols-2"><EducationSection accent={accent} filters={filters} setFilters={setFilters} /><ExperienceSection accent={accent} filters={filters} setFilters={setFilters} /></div><div className="mt-6 space-y-6"><TechSection accent={accent} filters={filters} setFilters={setFilters} /><ProjectsSection accent={accent} filters={filters} setFilters={setFilters} /></div></Shell>
}

function DesignTwo({ filters, setFilters }: { filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const accent: Accent = 'violet'
  return <Shell><Hero accent={accent} /><div className="mt-6 grid gap-4 md:grid-cols-12"><div className="md:col-span-4"><EducationSection accent={accent} filters={filters} setFilters={setFilters} /></div><div className="md:col-span-8"><ExperienceSection accent={accent} filters={filters} setFilters={setFilters} /></div><div className="md:col-span-12"><TechSection accent={accent} filters={filters} setFilters={setFilters} /></div><div className="md:col-span-12"><ProjectsSection accent={accent} filters={filters} setFilters={setFilters} /></div></div></Shell>
}

function DesignThree({ filters, setFilters }: { filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const accent: Accent = 'emerald'
  return <Shell><Hero accent={accent} /><div className="mt-6 grid gap-5 md:grid-cols-[1.45fr_1fr]"><LayoutPanel accent={accent}><ExperienceSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel><div className="space-y-4"><LayoutPanel accent={accent}><EducationSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel><LayoutPanel accent={accent}><TechSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div></div><div className="mt-6"><LayoutPanel accent={accent}><ProjectsSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div></Shell>
}

function DesignFour({ filters, setFilters }: { filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const accent: Accent = 'rose'
  return <Shell><Hero accent={accent} /><div className="mt-6 grid gap-5 md:grid-cols-2"><div className="md:col-span-2"><LayoutPanel accent={accent}><ProjectsSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div><LayoutPanel accent={accent}><ExperienceSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel><LayoutPanel accent={accent}><EducationSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel><div className="md:col-span-2"><LayoutPanel accent={accent}><TechSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div></div></Shell>
}

function DesignFive({ filters, setFilters }: { filters: SectionFilters; setFilters: (f: SectionFilters) => void }) {
  const accent: Accent = 'indigo'
  return <Shell><Hero accent={accent} /><div className="mt-6 grid gap-5 md:grid-cols-12"><div className="md:col-span-4"><LayoutPanel accent={accent}><EducationSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div><div className="md:col-span-8"><LayoutPanel accent={accent}><ExperienceSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div><div className="md:col-span-12"><LayoutPanel accent={accent}><TechSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div><div className="md:col-span-12"><LayoutPanel accent={accent}><ProjectsSection accent={accent} filters={filters} setFilters={setFilters} /></LayoutPanel></div></div></Shell>
}

function DesignPage({ designId }: { designId: 1 | 2 | 3 | 4 | 5 }) {
  const [filters, setFilters] = useState<SectionFilters>(initialFilters)
  return <main className="min-h-screen bg-slate-900 p-6 md:p-10"><DesignSwitcher />{designId === 1 && <DesignOne filters={filters} setFilters={setFilters} />}{designId === 2 && <DesignTwo filters={filters} setFilters={setFilters} />}{designId === 3 && <DesignThree filters={filters} setFilters={setFilters} />}{designId === 4 && <DesignFour filters={filters} setFilters={setFilters} />}{designId === 5 && <DesignFive filters={filters} setFilters={setFilters} />}</main>
}

export default function App() {
  return <Routes><Route path="/" element={<Navigate replace to="/1" />} /><Route path="/1" element={<DesignPage designId={1} />} /><Route path="/2" element={<DesignPage designId={2} />} /><Route path="/3" element={<DesignPage designId={3} />} /><Route path="/4" element={<DesignPage designId={4} />} /><Route path="/5" element={<DesignPage designId={5} />} /></Routes>
}
