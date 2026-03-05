import type { ComponentType, ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MoonStar,
  Server,
  Wrench
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Education = { degree: string; school: string; period: string }
type Experience = { title: string; company: string; period: string; summary: string }
type Project = { name: string; stack: string; summary: string; github: string; demo?: string }
type StackItem = {
  name: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usedOn: string[]
}
type Accent = 'cyan' | 'violet' | 'emerald' | 'rose' | 'indigo'

const accentStyles: Record<Accent, { icon: string; border: string; soft: string; action: string }> = {
  cyan: {
    icon: 'text-cyan-300',
    border: 'border-cyan-900/70',
    soft: 'bg-cyan-950/25',
    action: 'border-cyan-800 text-cyan-300'
  },
  violet: {
    icon: 'text-violet-300',
    border: 'border-violet-900/70',
    soft: 'bg-violet-950/25',
    action: 'border-violet-800 text-violet-300'
  },
  emerald: {
    icon: 'text-emerald-300',
    border: 'border-emerald-900/70',
    soft: 'bg-emerald-950/25',
    action: 'border-emerald-800 text-emerald-300'
  },
  rose: {
    icon: 'text-rose-300',
    border: 'border-rose-900/70',
    soft: 'bg-rose-950/25',
    action: 'border-rose-800 text-rose-300'
  },
  indigo: {
    icon: 'text-indigo-300',
    border: 'border-indigo-900/70',
    soft: 'bg-indigo-950/25',
    action: 'border-indigo-800 text-indigo-300'
  }
}

const profile = {
  name: 'Avery Thompson',
  role: 'Backend Software Engineer',
  intro:
    'I design resilient backend systems with clear contracts, robust observability, and predictable performance under load.',
  contact: {
    email: 'avery.backend@example.dev',
    linkedin: 'https://linkedin.com/in/avery-backend',
    github: 'https://github.com/avery-backend'
  },
  education: [
    { degree: 'MSc Computer Science', school: 'University of Manchester', period: '2019 — 2021' },
    { degree: 'BSc Software Engineering', school: 'University of Leeds', period: '2015 — 2019' }
  ] as Education[],
  experience: [
    {
      title: 'Senior Backend Engineer',
      company: 'Cloudforge Labs',
      period: '2023 — Present',
      summary: 'Led service decomposition and cut p95 latency by 45% across core APIs.'
    },
    {
      title: 'Backend Engineer',
      company: 'Finstack Systems',
      period: '2021 — 2023',
      summary: 'Built secure payment processing services handling 12M+ monthly transactions.'
    }
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
    {
      name: 'LedgerStream',
      stack: 'Go · Kafka · PostgreSQL',
      summary: 'High-throughput transaction ingestion with idempotent write guarantees.',
      github: 'https://github.com/avery-backend/ledgerstream',
      demo: 'https://ledgerstream-demo.example.dev'
    },
    {
      name: 'AuthBridge',
      stack: 'Node.js · Redis · OIDC',
      summary: 'Tenant-aware auth gateway with short-lived tokens and full audit trails.',
      github: 'https://github.com/avery-backend/authbridge'
    },
    {
      name: 'OpsPulse',
      stack: 'Python · Prometheus · Grafana',
      summary: 'Unified observability dashboard for traces, metrics, and incident context.',
      github: 'https://github.com/avery-backend/opspulse',
      demo: 'https://opspulse.example.dev'
    }
  ] as Project[]
}

function SectionTitle({ icon: Icon, children, accent }: { icon: ComponentType<{ className?: string }>; children: string; accent: Accent }) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-100">
      <Icon className={`h-5 w-5 ${accentStyles[accent].icon}`} />
      {children}
    </h2>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-200">{children}</div>
}

function DesignSwitcher() {
  const { pathname } = useLocation()
  return (
    <div className="mx-auto mb-8 flex max-w-6xl flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((id) => (
        <Link key={id} to={`/${id}`}>
          <Button variant={pathname === `/${id}` ? 'default' : 'outline'} size="sm">
            <MoonStar className="h-4 w-4" /> Design {id}
          </Button>
        </Link>
      ))}
    </div>
  )
}

function EducationSection({ accent }: { accent: Accent }) {
  return (
    <section>
      <SectionTitle icon={GraduationCap} accent={accent}>Education</SectionTitle>
      <div className="mt-3 space-y-3">
        {profile.education.map((item) => (
          <div key={item.degree} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}>
            <p className="font-medium text-slate-100">{item.degree}</p>
            <p className="text-sm text-slate-400">{item.school}</p>
            <p className="text-xs text-slate-500">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection({ accent }: { accent: Accent }) {
  return (
    <section>
      <SectionTitle icon={BriefcaseBusiness} accent={accent}>Experience</SectionTitle>
      <div className="mt-3 space-y-3">
        {profile.experience.map((item) => (
          <div key={item.company + item.title} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}>
            <p className="font-medium text-slate-100">{item.title} · {item.company}</p>
            <p className="text-xs text-slate-500">{item.period}</p>
            <p className="text-sm text-slate-300">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TechSection({ accent }: { accent: Accent }) {
  const proficiencyStyles: Record<StackItem['proficiency'], string> = {
    Beginner: 'text-amber-300 border-amber-900/60 bg-amber-950/40',
    Intermediate: 'text-sky-300 border-sky-900/60 bg-sky-950/40',
    Advanced: 'text-indigo-300 border-indigo-900/60 bg-indigo-950/40',
    Expert: 'text-emerald-300 border-emerald-900/60 bg-emerald-950/40'
  }

  return (
    <section>
      <SectionTitle icon={Wrench} accent={accent}>Tech Stack</SectionTitle>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {profile.stack.map((tech) => (
          <div key={tech.name} className={`rounded-lg border bg-slate-900 p-3 ${accentStyles[accent].border}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-slate-100">{tech.name}</p>
              <Badge className={`border ${proficiencyStyles[tech.proficiency]}`}>{tech.proficiency}</Badge>
            </div>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Used on projects / jobs</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-300">
              {tech.usedOn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection({ accent }: { accent: Accent }) {
  return (
    <section>
      <SectionTitle icon={Code2} accent={accent}>Featured Projects</SectionTitle>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {profile.projects.map((project) => (
          <Card key={project.name} className={`border bg-slate-900 text-slate-200 ${accentStyles[accent].border}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-100">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">{project.stack}</p>
              <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
              <div className="mt-4 flex gap-2">
                <a href={project.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-slate-800 ${accentStyles[accent].action}`}>
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-slate-800 ${accentStyles[accent].action}`}>
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </a>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
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

  return (
    <section className={`rounded-2xl border bg-gradient-to-br p-6 ${accents[accent]}`}>
      <p className={`mb-2 flex items-center gap-2 text-sm ${accentStyles[accent].icon}`}>
        <Server className="h-4 w-4" /> Hero / Introduction
      </p>
      <h1 className="text-4xl font-bold text-white">{profile.name}</h1>
      <p className="text-lg text-slate-300">{profile.role}</p>
      <p className="mt-3 max-w-3xl text-slate-300">{profile.intro}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href={`mailto:${profile.contact.email}`} className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}>
          <Mail className="h-4 w-4" /> Email
        </a>
        <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}>
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a href={profile.contact.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-800 ${accentStyles[accent].action}`}>
          <Github className="h-4 w-4" /> GitHub
        </a>
      </div>
    </section>
  )
}

function LayoutPanel({ children, accent }: { children: ReactNode; accent: Accent }) {
  return <div className={`rounded-xl border p-4 md:p-5 ${accentStyles[accent].border} ${accentStyles[accent].soft}`}>{children}</div>
}

function DesignOne() {
  const accent: Accent = 'cyan'
  return (
    <Shell>
      <Hero accent={accent} />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <EducationSection accent={accent} />
        <ExperienceSection accent={accent} />
      </div>
      <div className="mt-6 space-y-6">
        <TechSection accent={accent} />
        <ProjectsSection accent={accent} />
      </div>
    </Shell>
  )
}

function DesignTwo() {
  const accent: Accent = 'violet'
  return (
    <Shell>
      <Hero accent={accent} />
      <div className="mt-6 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4"><EducationSection accent={accent} /></div>
        <div className="md:col-span-8"><ExperienceSection accent={accent} /></div>
        <div className="md:col-span-12"><TechSection accent={accent} /></div>
        <div className="md:col-span-12"><ProjectsSection accent={accent} /></div>
      </div>
    </Shell>
  )
}

function DesignThree() {
  const accent: Accent = 'emerald'
  return (
    <Shell>
      <Hero accent={accent} />
      <div className="mt-6 grid gap-5 md:grid-cols-[1.45fr_1fr]">
        <LayoutPanel accent={accent}><ExperienceSection accent={accent} /></LayoutPanel>
        <div className="space-y-4">
          <LayoutPanel accent={accent}><EducationSection accent={accent} /></LayoutPanel>
          <LayoutPanel accent={accent}><TechSection accent={accent} /></LayoutPanel>
        </div>
      </div>
      <div className="mt-6">
        <LayoutPanel accent={accent}><ProjectsSection accent={accent} /></LayoutPanel>
      </div>
    </Shell>
  )
}

function DesignFour() {
  const accent: Accent = 'rose'
  return (
    <Shell>
      <Hero accent={accent} />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2"><LayoutPanel accent={accent}><ProjectsSection accent={accent} /></LayoutPanel></div>
        <LayoutPanel accent={accent}><ExperienceSection accent={accent} /></LayoutPanel>
        <LayoutPanel accent={accent}><EducationSection accent={accent} /></LayoutPanel>
        <div className="md:col-span-2"><LayoutPanel accent={accent}><TechSection accent={accent} /></LayoutPanel></div>
      </div>
    </Shell>
  )
}

function DesignFive() {
  const accent: Accent = 'indigo'
  return (
    <Shell>
      <Hero accent={accent} />
      <div className="mt-6 grid gap-5 md:grid-cols-12">
        <div className="md:col-span-4"><LayoutPanel accent={accent}><EducationSection accent={accent} /></LayoutPanel></div>
        <div className="md:col-span-8"><LayoutPanel accent={accent}><ExperienceSection accent={accent} /></LayoutPanel></div>
        <div className="md:col-span-12"><LayoutPanel accent={accent}><TechSection accent={accent} /></LayoutPanel></div>
        <div className="md:col-span-12"><LayoutPanel accent={accent}><ProjectsSection accent={accent} /></LayoutPanel></div>
      </div>
    </Shell>
  )
}

function DesignPage({ designId }: { designId: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <main className="min-h-screen bg-slate-900 p-6 md:p-10">
      <DesignSwitcher />
      {designId === 1 && <DesignOne />}
      {designId === 2 && <DesignTwo />}
      {designId === 3 && <DesignThree />}
      {designId === 4 && <DesignFour />}
      {designId === 5 && <DesignFive />}
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/1" />} />
      <Route path="/1" element={<DesignPage designId={1} />} />
      <Route path="/2" element={<DesignPage designId={2} />} />
      <Route path="/3" element={<DesignPage designId={3} />} />
      <Route path="/4" element={<DesignPage designId={4} />} />
      <Route path="/5" element={<DesignPage designId={5} />} />
    </Routes>
  )
}
