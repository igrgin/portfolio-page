import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Education = { degree: string; school: string; period: string }
type Experience = { title: string; company: string; period: string; summary: string }
type Project = { name: string; stack: string; summary: string }

const profile = {
  name: 'Avery Thompson',
  role: 'Backend Software Engineer',
  intro:
    'I build reliable backend platforms focused on performance, observability, and maintainability. I enjoy designing APIs, distributed systems, and data-intensive services that scale with product growth.',
  contact: {
    email: 'avery.backend@example.dev',
    linkedin: 'linkedin.com/in/avery-backend',
    github: 'github.com/avery-backend'
  },
  education: [
    {
      degree: 'MSc Computer Science',
      school: 'University of Manchester',
      period: '2019 — 2021'
    },
    {
      degree: 'BSc Software Engineering',
      school: 'University of Leeds',
      period: '2015 — 2019'
    }
  ] as Education[],
  experience: [
    {
      title: 'Senior Backend Engineer',
      company: 'Cloudforge Labs',
      period: '2023 — Present',
      summary: 'Led migration to event-driven services and reduced p95 API latency by 45%.'
    },
    {
      title: 'Backend Engineer',
      company: 'Finstack Systems',
      period: '2021 — 2023',
      summary: 'Built secure payment processing pipelines handling 12M+ monthly transactions.'
    }
  ] as Experience[],
  stack: ['Go', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS'],
  projects: [
    {
      name: 'LedgerStream',
      stack: 'Go · Kafka · PostgreSQL',
      summary: 'High-throughput transaction ingestion with idempotent write guarantees.'
    },
    {
      name: 'AuthBridge',
      stack: 'Node.js · Redis · OpenID Connect',
      summary: 'Tenant-aware identity gateway with short-lived tokens and robust audit logs.'
    },
    {
      name: 'OpsPulse',
      stack: 'Python · Prometheus · Grafana',
      summary: 'Service health dashboard consolidating traces, metrics, and alerting workflows.'
    }
  ] as Project[]
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
}

function DesignSwitcher() {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto mb-8 flex max-w-6xl flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((id) => (
        <Link key={id} to={`/${id}`}>
          <Button variant={pathname === `/${id}` ? 'default' : 'outline'} size="sm">
            Design {id}
          </Button>
        </Link>
      ))}
    </div>
  )
}

function EducationSection() {
  return (
    <section>
      <SectionTitle>Education</SectionTitle>
      <div className="mt-3 space-y-3">
        {profile.education.map((item) => (
          <div key={item.degree}>
            <p className="font-medium">{item.degree}</p>
            <p className="text-sm opacity-75">{item.school}</p>
            <p className="text-xs opacity-60">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section>
      <SectionTitle>Experience</SectionTitle>
      <div className="mt-3 space-y-3">
        {profile.experience.map((item) => (
          <div key={item.company + item.title}>
            <p className="font-medium">{item.title} · {item.company}</p>
            <p className="text-xs opacity-60">{item.period}</p>
            <p className="text-sm opacity-80">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TechSection() {
  return (
    <section>
      <SectionTitle>Tech Stack</SectionTitle>
      <div className="mt-3 flex flex-wrap gap-2">
        {profile.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section>
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {profile.projects.map((project) => (
          <Card key={project.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs opacity-65">{project.stack}</p>
              <p className="mt-2 text-sm opacity-85">{project.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section>
      <SectionTitle>Contact</SectionTitle>
      <div className="mt-3 text-sm leading-7">
        <p>{profile.contact.email}</p>
        <p>{profile.contact.linkedin}</p>
        <p>{profile.contact.github}</p>
      </div>
    </section>
  )
}

function DesignOne() {
  return (
    <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 p-8 shadow-lg">
      <section>
        <p className="text-sm font-medium text-blue-700">Hero / Introduction</p>
        <h1 className="mt-2 text-4xl font-bold">{profile.name}</h1>
        <p className="text-lg text-slate-700">{profile.role}</p>
        <p className="mt-3 max-w-3xl text-slate-600">{profile.intro}</p>
      </section>
      <Separator className="my-6" />
      <div className="grid gap-6 md:grid-cols-2">
        <EducationSection />
        <ExperienceSection />
      </div>
      <div className="mt-6 space-y-6">
        <TechSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  )
}

function DesignTwo() {
  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-100">
      <section className="rounded-2xl border border-cyan-900/70 bg-slate-900 p-6">
        <p className="text-sm font-medium text-cyan-300">Hero / Introduction</p>
        <h1 className="mt-2 text-4xl font-bold">{profile.name}</h1>
        <p className="text-cyan-200">{profile.role}</p>
        <p className="mt-3 text-slate-300">{profile.intro}</p>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-2 [&_h2]:text-cyan-200">
        <Card className="border-slate-800 bg-slate-900 text-slate-100"><CardContent className="pt-6"><EducationSection /></CardContent></Card>
        <Card className="border-slate-800 bg-slate-900 text-slate-100"><CardContent className="pt-6"><ExperienceSection /></CardContent></Card>
      </div>
      <div className="mt-4 space-y-4 [&_h2]:text-cyan-200">
        <Card className="border-slate-800 bg-slate-900 text-slate-100"><CardContent className="pt-6"><TechSection /></CardContent></Card>
        <Card className="border-slate-800 bg-slate-900 text-slate-100"><CardContent className="pt-6"><ProjectsSection /></CardContent></Card>
        <Card className="border-slate-800 bg-slate-900 text-slate-100"><CardContent className="pt-6"><ContactSection /></CardContent></Card>
      </div>
    </div>
  )
}

function DesignThree() {
  return (
    <div className="mx-auto max-w-6xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8">
      <section className="rounded-3xl bg-white p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Hero / Introduction</p>
        <h1 className="mt-3 text-5xl font-extrabold text-emerald-950">{profile.name}</h1>
        <p className="text-xl text-emerald-800">{profile.role}</p>
        <p className="mt-4 max-w-3xl text-emerald-900">{profile.intro}</p>
      </section>
      <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <Card className="border-emerald-200 bg-white"><CardContent className="pt-6"><ExperienceSection /></CardContent></Card>
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-white"><CardContent className="pt-6"><EducationSection /></CardContent></Card>
          <Card className="border-emerald-200 bg-white"><CardContent className="pt-6"><TechSection /></CardContent></Card>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-200 bg-white"><CardContent className="pt-6"><ProjectsSection /></CardContent></Card>
        <Card className="border-emerald-200 bg-white"><CardContent className="pt-6"><ContactSection /></CardContent></Card>
      </div>
    </div>
  )
}

function DesignFour() {
  return (
    <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 ring-1 ring-rose-200">
      <section className="grid gap-4 rounded-2xl bg-rose-50 p-6 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-sm font-medium text-rose-700">Hero / Introduction</p>
          <h1 className="mt-2 text-4xl font-bold text-rose-950">{profile.name}</h1>
          <p className="text-lg text-rose-700">{profile.role}</p>
          <p className="mt-3 text-slate-700">{profile.intro}</p>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-rose-200">
          <p className="text-xs uppercase tracking-widest text-rose-700">Current focus</p>
          <p className="mt-2 text-sm">Platform reliability, observability, and secure API architecture.</p>
        </div>
      </section>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="border-rose-200"><CardContent className="pt-6"><EducationSection /></CardContent></Card>
        <Card className="border-rose-200"><CardContent className="pt-6"><ExperienceSection /></CardContent></Card>
        <Card className="border-rose-200 md:col-span-2"><CardContent className="pt-6"><TechSection /></CardContent></Card>
        <Card className="border-rose-200 md:col-span-2"><CardContent className="pt-6"><ProjectsSection /></CardContent></Card>
        <Card className="border-rose-200 md:col-span-2"><CardContent className="pt-6"><ContactSection /></CardContent></Card>
      </div>
    </div>
  )
}

function DesignFive() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 rounded-3xl bg-indigo-50 p-8">
      <section className="rounded-3xl bg-indigo-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-widest text-indigo-200">Hero / Introduction</p>
        <h1 className="mt-2 text-4xl font-bold">{profile.name}</h1>
        <p className="text-indigo-100">{profile.role}</p>
        <p className="mt-3 max-w-3xl text-indigo-50">{profile.intro}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-12">
        <Card className="border-indigo-200 bg-white md:col-span-4"><CardContent className="pt-6"><EducationSection /></CardContent></Card>
        <Card className="border-indigo-200 bg-white md:col-span-8"><CardContent className="pt-6"><ExperienceSection /></CardContent></Card>
        <Card className="border-indigo-200 bg-white md:col-span-12"><CardContent className="pt-6"><TechSection /></CardContent></Card>
        <Card className="border-indigo-200 bg-white md:col-span-12"><CardContent className="pt-6"><ProjectsSection /></CardContent></Card>
        <Card className="border-indigo-200 bg-white md:col-span-12"><CardContent className="pt-6"><ContactSection /></CardContent></Card>
      </div>
    </div>
  )
}

function DesignPage({ designId }: { designId: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
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
